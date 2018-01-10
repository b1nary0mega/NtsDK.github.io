var nodes = [];
var edges = [];
var dictionary = {};

const root = 'body ';

const state = {};
state.nodesDataset = new vis.DataSet();
state.edgesDataset = new vis.DataSet();


function init(){
  document.querySelector('.nodesText').value = charExample;
  setAttr(document.querySelector('.nodesText'),'rows', charExample.split('\n').length);
  document.querySelector('.edgesText').value = nodesExample;
  setAttr(document.querySelector('.edgesText'),'rows', nodesExample.split('\n').length);
  
  document.querySelector('.draw-button').addEventListener('click', draw);
  document.querySelector('.get-image-button').addEventListener('click', getImage);
  document.querySelector('.download-button').addEventListener('click', downloadCsv);
  document.querySelector('.clear-button').addEventListener('click', clearNetwork);
  
  listen(queryEl(`${root}.save-edge-button`), 'click', updateEdge);
  listen(queryEl(`${root}.cancel-add-edge-button`), 'click', cancel('.board-add-edge-popup'));
  
  listen(document, 'keyup', function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
      queryEls(`${root}.hidable-popup`).forEach(el => addClass(el, 'hidden'));
    }
  });
  
  draw();
}

// create a network
function drawNetwork() {
  var container = document.getElementById('mynetwork');
  /*var data = {
    nodes: nodes,
    edges: edges
  };*/
  var options = {
    locale: 'ru',
    locales: visLocales,
    manipulation: {
        addNode: function (data, callback) {
          // filling in the popup DOM elements
          document.getElementById('operation').innerHTML = "Добавить узел";
          document.getElementById('node-id').value = data.id;
          document.getElementById('node-label').value = data.label;
          document.getElementById('node-group').value = "";
          document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
          document.getElementById('cancelButton').onclick = clearPopUp.bind();
          document.getElementById('network-popUp').style.display = 'block';
          document.getElementById('node-label').focus();
        },
        editNode: function (data, callback) {
          // filling in the popup DOM elements
          document.getElementById('operation').innerHTML = "Редактировать узел";
          document.getElementById('node-id').value = data.id;
          document.getElementById('node-label').value = data.label;
          document.getElementById('node-group').value = data.group;
          document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
          document.getElementById('cancelButton').onclick = cancelEdit.bind(this,callback);
          document.getElementById('network-popUp').style.display = 'block';
          document.getElementById('node-label').focus();
        },
        addEdge: function (data, callback) {
          data.arrows ='to';
          if (data.from == data.to) {
            var r = confirm("Хотите ли вы присоединить узел к самому себе?");
            if (r == true) {
              callback(data);
            }
          }
          else {
            callback(data);
          }
        }
    }
  };
  const data = {
    nodes: state.nodesDataset,
    edges: state.edgesDataset
  };
  var network = new vis.Network(container, data, options);
  network.on('selectEdge', showEdgeLabelEditor);
  network.on('deselectEdge', hideEdgeLabelEditor);
}

function showEdgeLabelEditor(params) {
    if (params.edges.length !== 0 && params.nodes.length === 0) {
        const edge = state.edgesDataset.get(params.edges[0]);
        state.modifyArgs = {
            edge,
            callback(edge2) {
                if (edge2) {
                    state.edgesDataset.update(edge2);
                }
            },
            editEdge: true
        };
        queryEl(`${root}.add-edge-label-input`).value = edge.label || '';
        showPopup('.board-add-edge-popup', true);
        queryEl(`${root}.add-edge-label-input`).focus();
    }
}
function hideEdgeLabelEditor(params) {
    showPopup('.board-add-edge-popup', false);
}

function showPopup(selector, show) {
    setClassByCondition(queryEl(selector), 'hidden', !show);
}

function clearPopUp() {
  document.getElementById('saveButton').onclick = null;
  document.getElementById('cancelButton').onclick = null;
  document.getElementById('network-popUp').style.display = 'none';
}

function cancelEdit(callback) {
  clearPopUp();
  callback(null);
}

function saveData(data,callback) {
  data.id = document.getElementById('node-id').value;
  data.label = document.getElementById('node-label').value;
  data.group = document.getElementById('node-group').value;
  clearPopUp();
  callback(data);
}

function parseData(){
  nodes = [];
  const nodesText = document.querySelector('.nodesText').value;
  nodesText.split('\n').filter(el => el.trim() !== '').forEach((str, index) => {
    let arr = str.split('\t');
    dictionary[arr[0].toLowerCase().trim()] = index;
    nodes.push({
      id: index,
      label: arr[0],
      group: arr[1]
    })
  });
  
  state.nodesDataset.clear();
  state.nodesDataset.add(nodes);
  
  edges = [];
  const edgesText = document.querySelector('.edgesText').value;
  edgesText.split('\n').filter(el => el.trim() !== '').forEach((str, index) => {
    let arr = str.split('\t');
    
    let from = arr[0].toLowerCase().trim();
    let to = arr[2].toLowerCase().trim();
    if(dictionary[from] !== undefined && dictionary[to] !== undefined){
      edges.push({
        from: dictionary[from],
        to: dictionary[to],
        label: arr[1],
        arrows:'to',
      })
    }
    
  });
  
  state.edgesDataset.clear();
  state.edgesDataset.add(edges);
}

function draw(){
  parseData();
  drawNetwork();
}

function getImage(event){
  var canvas = document.querySelector("canvas");
  
  var context = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;
  
  context.globalCompositeOperation = "destination-over";
  context.fillStyle = "#ffffff";
  context.fillRect(0,0,w,h);
  
  var img    = canvas.toDataURL("image/png");
  var link = document.querySelector(".link");
  event.target.href = img;
  //draw();
  drawNetwork();
  //document.write('<img src="'+img+'"/>');
}

function clearNetwork(){
  var r = confirm("Очистка шестеренки необратима. Вы уверены?");
  if (r == true) {
    document.querySelector('.nodesText').value = '';
    document.querySelector('.edgesText').value = '';
    draw();
  }
}

function updateEdge() {
    const input = queryEl(`${root}.add-edge-label-input`);
    const label = input.value.trim();
    const { edge } = state.modifyArgs;
    edge.label = label;
    showPopup('.board-add-edge-popup', false);
    input.value = '';
    state.modifyArgs.callback(edge);
}

function cancel(selector) {
    return () => {
        showPopup(selector, false);
        state.modifyArgs.callback();
    };
}

function downloadCsv() {
    var arr = state.nodesDataset.map((node) => [node.label, node.group]);
    var arr2 = state.edgesDataset.map((edge) => [state.nodesDataset.get(edge.from).label, edge.label, 
      state.nodesDataset.get(edge.to).label]);

    arr2d2Csv(arr.concat(arr2), 'cogs.csv');
}

function preprocessCsvStr(str) {
    if (!(typeof str === 'string' || str instanceof String)) {
        return str;
    }
    let result = str.replace(/"/g, '""');
    if (result.search(/("|,|\n)/g) >= 0) {
        result = `"${result}"`;
    }
    return result;
}

var arr2d2Csv = (arr, fileName) => {
    const csv = `\ufeff${arr.map(dataArray => dataArray.map(preprocessCsvStr).join(';')).join('\n')}`;

    const out = new Blob([csv], {
        type: 'text/csv;charset=utf-8;'
    });
    saveAs(out, fileName);
};

init();