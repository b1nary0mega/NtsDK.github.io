var nodes = [];
var edges = [];
var dictionary = {};

const root = 'body ';

const state = {};
state.nodesDataset = new vis.DataSet();
state.edgesDataset = new vis.DataSet();


function init(){
  queryEl(`${root}.custom-physics-settings`).value = '';
  
  document.querySelector('.nodesText').value = charExample;
  setAttr(document.querySelector('.nodesText'),'rows', charExample.split('\n').length);
  document.querySelector('.edgesText').value = edgesExample;
  setAttr(document.querySelector('.edgesText'),'rows', edgesExample.split('\n').length);
  
  document.querySelector('.draw-button').addEventListener('click', draw);
  document.querySelector('.get-image-button').addEventListener('click', getImage);
  document.querySelector('.download-button').addEventListener('click', downloadCsv);
  document.querySelector('.clear-button').addEventListener('click', clearNetwork);
  var closeBtn = addEl(addClasses(makeEl('button'), ['btn','btn-default']),makeText('Закрыть'));
  
  listenOnEnter(queryEl(`${root}#node-label`), () => document.getElementById('saveButton').click());
  listenOnEnter(queryEl(`${root}#node-group`), () => document.getElementById('saveButton').click());
  listenOnEnter(queryEl(`${root}#node-notes`), () => document.getElementById('saveButton').click());
  
  listen(queryEl(`${root}.save-edge-button`), 'click', updateEdge);
  listenOnEnter(queryEl(`${root}.add-edge-label-input`), () => queryEl(`${root}.save-edge-button`).click());
  listen(queryEl(`${root}.cancel-add-edge-button`), 'click', cancel('.board-add-edge-popup'));
  
  listen(queryEl(`${root}.close-settings-popup-button`), 'click', cancel('#config'));
  listen(queryEl(`${root}.physics-settings-button`), 'click', () => showPopup(`${root}#config`, true));
  
  listen(queryEl(`${root}.search-node`), 'change', onNodeFocus);
  
  listen(queryEl(`${root}.custom-physics-settings-button`), 'click', () => {
    var options = queryEl(`${root}.custom-physics-settings`).value;
    if(options.trim() === ''){
      return;
    }
    if(CU.startsWith(options, 'var options = ')){
      options = options.substring('var options = '.length);
    }
    try{
      options = JSON.parse(options);
    }catch(e){
      console.error(e);
      alert('Ошибка при загрузке настроек');
      return;
    }
    state.network.setOptions(options);
  });
  
  queryEl(`${root}.physics-enabled-checkbox`).checked = true;
  listen(queryEl(`${root}.physics-enabled-checkbox`), 'change', (event) => {
    state.network.setOptions({
      "physics": {
        "enabled": event.target.checked,
        "minVelocity": 0.75
      }
    })
  });
  
  queryEl(`${root}.show-notes-checkbox`).checked = true;
  listen(queryEl(`${root}.show-notes-checkbox`), 'change', draw);
  
  listen(document, 'keyup', function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
      queryEls(`${root}.hidable-popup`).forEach(el => addClass(el, 'hidden'));
    }
  });
  
  state.nodesDataset.on('*', () => {
    updateNodeTextArea();
    fillSearchSelect();
  });
  state.edgesDataset.on('*', () => {
    updateEdgeTextArea();
  });
  
  draw();
}

// create a network
function drawNetwork() {
  var container = document.getElementById('mynetwork');
  var options = {
    locale: 'ru',
    locales: visLocales,
    manipulation: {
        addNode: function (data, callback) {
          // filling in the popup DOM elements
          data.label = '';
          data.name = '';
          document.getElementById('operation').innerHTML = "Добавить узел";
          document.getElementById('node-id').value = data.id;
          document.getElementById('node-label').value = data.name;
          document.getElementById('node-group').value = "";
          document.getElementById('node-notes').value = "";
          document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
          document.getElementById('cancelButton').onclick = clearPopUp.bind();
          document.getElementById('network-popUp').style.display = 'block';
          document.getElementById('node-label').focus();
        },
        editNode: function (data, callback) {
          // filling in the popup DOM elements
          document.getElementById('operation').innerHTML = "Редактировать узел";
          document.getElementById('node-id').value = data.id;
          document.getElementById('node-label').value = data.name;
          document.getElementById('node-group').value = data.group;
          document.getElementById('node-notes').value = data.notes;
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
              //updateTextAreas();
            }
          }
          else {
            callback(data);
            //updateTextAreas();
          }
        },
        editEdge:function (data, callback) {
          callback(data);
          //updateTextAreas();
        },
        deleteNode:function (data, callback) {
          callback(data);
          //updateTextAreas();
        },
        deleteEdge:function (data, callback) {
          callback(data);
          //updateTextAreas();
        },
    },
    physics: {
      enabled: queryEl(`${root}.physics-enabled-checkbox`).checked,
      stabilization: false
    },
    configure: {
      filter:function (option, path) {
        if (path.indexOf('physics') !== -1) {
          return true;
        }
        if (path.indexOf('smooth') !== -1 || option === 'smooth') {
          return true;
        }
        return false;
      },
      container: document.getElementById('configInner')
    }
  };
  const data = {
    nodes: state.nodesDataset,
    edges: state.edgesDataset
  };
  state.network = new vis.Network(container, data, options);
  state.network.on('selectEdge', showEdgeLabelEditor);
  state.network.on('deselectEdge', hideEdgeLabelEditor);
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
  data.name = document.getElementById('node-label').value;
  data.group = document.getElementById('node-group').value;
  data.notes = document.getElementById('node-notes').value;
  data.label = makeLabel(data.name, data.notes);
  clearPopUp();
  callback(data);
}

function makeLabel(name, notes){
  let label = name; 
  if(queryEl(`${root}.show-notes-checkbox`).checked){
    label += (notes.trim() !== '' ? ('\n\n' + notes) : '');
  }
  return label;
}

function parseData(){
  nodes = [];
  const nodesText = document.querySelector('.nodesText').value;
  nodesText.split('\n').filter(el => el.trim() !== '').forEach((str, index) => {
    let arr = str.split('\t');
    dictionary[arr[0].toLowerCase().trim()] = index;
    var label = makeLabel(arr[0], arr[2]);
    nodes.push({
      id: index,
      label,
      group: arr[1],
      notes: arr[2],
      name: arr[0]
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
  drawNetwork();
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

function updateNodeTextArea(){
  document.querySelector('.nodesText').value = state.nodesDataset.map((node) => [node.name, node.group, node.notes].join('\t')).join('\n');
}

function updateEdgeTextArea(){
  document.querySelector('.edgesText').value = state.edgesDataset.map((edge) => [state.nodesDataset.get(edge.from).name, edge.label, 
      state.nodesDataset.get(edge.to).name].join('\t')).join('\n');
}

function fillSearchSelect(){
  var arr = state.nodesDataset.map((node) => ({name: node.name, value: node.id}));
  arr.sort(CU.charOrdAFactory(a => a.name.toLowerCase()));
  fillSelector(clearEl(queryEl('.search-node')), arr);
}

function downloadCsv() {
    var arr = state.nodesDataset.map((node) => [node.name, node.group, node.notes]);
    var arr2 = state.edgesDataset.map((edge) => [state.nodesDataset.get(edge.from).name, edge.label, 
      state.nodesDataset.get(edge.to).name]);

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

function onNodeFocus(event) {
    state.network.focus(event.target.value, snFocusOptions);
}

init();