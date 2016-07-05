/**
  @author David Piegza

  Implements a simple graph drawing with force-directed placement in 2D and 3D.

  It uses the force-directed-layout implemented in:
  https://github.com/davidpiegza/Graph-Visualization/blob/master/layouts/force-directed-layout.js

  Drawing is done with Three.js: http://github.com/mrdoob/three.js

  To use this drawing, include the graph-min.js file and create a SimpleGraph object:

  <!DOCTYPE html>
  <html>
    <head>
      <title>Graph Visualization</title>
      <script type="text/javascript" src="path/to/graph-min.js"></script>
    </head>
    <body onload="new Drawing.SimpleGraph({layout: '3d', showStats: true, showInfo: true})">
    </bod>
  </html>

  Parameters:
  options = {
    layout: "2d" or "3d"

    showStats: <bool>, displays FPS box
    showInfo: <bool>, displays some info on the graph and layout
              The info box is created as <div id="graph-info">, it must be
              styled and positioned with CSS.


    selection: <bool>, enables selection of nodes on mouse over (it displays some info
               when the showInfo flag is set)


    limit: <int>, maximum number of nodes

    numNodes: <int> - sets the number of nodes to create.
    numEdges: <int> - sets the maximum number of edges for a node. A node will have
              1 to numEdges edges, this is set randomly.
  }


  Feel free to contribute a new drawing!

 */
 
var colorPalette = [
      //{color: {border: "#2B7CE9", background: "#97C2FC", highlight: {border: "#2B7CE9", background: "#D2E5FF"}, hover: {border: "#2B7CE9", background: "#D2E5FF"}}}, // 0: blue
      //{color: {border: "#FFA500", background: "#FFFF00", highlight: {border: "#FFA500", background: "#FFFFA3"}, hover: {border: "#FFA500", background: "#FFFFA3"}}}, // 1: yellow
      {color: {border: "#FA0A10", background: "#FB7E81", highlight: {border: "#FA0A10", background: "#FFAFB1"}, hover: {border: "#FA0A10", background: "#FFAFB1"}}}, // 2: red
      {color: {border: "#41A906", background: "#7BE141", highlight: {border: "#41A906", background: "#A1EC76"}, hover: {border: "#41A906", background: "#A1EC76"}}}, // 3: green
      {color: {border: "#E129F0", background: "#EB7DF4", highlight: {border: "#E129F0", background: "#F0B3F5"}, hover: {border: "#E129F0", background: "#F0B3F5"}}}, // 4: magenta
      {color: {border: "#7C29F0", background: "#AD85E4", highlight: {border: "#7C29F0", background: "#D3BDF0"}, hover: {border: "#7C29F0", background: "#D3BDF0"}}}, // 5: purple
      {color: {border: "#C37F00", background: "#FFA807", highlight: {border: "#C37F00", background: "#FFCA66"}, hover: {border: "#C37F00", background: "#FFCA66"}}}, // 6: orange
      {color: {border: "#4220FB", background: "#6E6EFD", highlight: {border: "#4220FB", background: "#9B9BFD"}, hover: {border: "#4220FB", background: "#9B9BFD"}}}, // 7: darkblue
      {color: {border: "#FD5A77", background: "#FFC0CB", highlight: {border: "#FD5A77", background: "#FFD1D9"}, hover: {border: "#FD5A77", background: "#FFD1D9"}}}, // 8: pink
      {color: {border: "#4AD63A", background: "#C2FABC", highlight: {border: "#4AD63A", background: "#E6FFE3"}, hover: {border: "#4AD63A", background: "#E6FFE3"}}}, // 9: mint
      
      {color: {border: "#990000", background: "#EE0000", highlight: {border: "#BB0000", background: "#FF3333"}, hover: {border: "#BB0000", background: "#FF3333"}}}, // 10:bright red
      
      {color: {border: "#FF6000", background: "#FF6000", highlight: {border: "#FF6000", background: "#FF6000"}, hover: {border: "#FF6000", background: "#FF6000"}}}, // 12: real orange
      {color: {border: "#97C2FC", background: "#2B7CE9", highlight: {border: "#D2E5FF", background: "#2B7CE9"}, hover: {border: "#D2E5FF", background: "#2B7CE9"}}}, // 13: blue
      {color: {border: "#399605", background: "#255C03", highlight: {border: "#399605", background: "#255C03"}, hover: {border: "#399605", background: "#255C03"}}}, // 14: green
      {color: {border: "#B70054", background: "#FF007E", highlight: {border: "#B70054", background: "#FF007E"}, hover: {border: "#B70054", background: "#FF007E"}}}, // 15: magenta
      {color: {border: "#AD85E4", background: "#7C29F0", highlight: {border: "#D3BDF0", background: "#7C29F0"}, hover: {border: "#D3BDF0", background: "#7C29F0"}}}, // 16: purple
      {color: {border: "#4557FA", background: "#000EA1", highlight: {border: "#6E6EFD", background: "#000EA1"}, hover: {border: "#6E6EFD", background: "#000EA1"}}}, // 17: darkblue
      {color: {border: "#FFC0CB", background: "#FD5A77", highlight: {border: "#FFD1D9", background: "#FD5A77"}, hover: {border: "#FFD1D9", background: "#FD5A77"}}}, // 18: pink
      {color: {border: "#C2FABC", background: "#74D66A", highlight: {border: "#E6FFE3", background: "#74D66A"}, hover: {border: "#E6FFE3", background: "#74D66A"}}}, // 19: mint
      
      {color: {border: "#EE0000", background: "#990000", highlight: {border: "#FF3333", background: "#BB0000"}, hover: {border: "#FF3333", background: "#BB0000"}}} // 20:bright red
    ];
		
		var groupColors = {};

var Drawing = Drawing || {};

Drawing.SimpleGraph = function(options) {
  var options = options || {};

  this.layout = options.layout || "2d";
  this.layout_options = options.graphLayout || {};
  this.show_stats = options.showStats || false;
  this.show_info = options.showInfo || false;
  this.show_labels = options.showLabels || false;
  this.selection = options.selection || false;
  this.limit = options.limit || 10;
  this.nodes_count = options.numNodes || 20;
  this.edges_count = options.numEdges || 10;

  var camera, controls, scene, renderer, interaction, geometry, object_selection;
  var stats;
  var info_text = {};
  var graph = new Graph({limit: options.limit});

  var geometries = [];

  var that=this;

  init();
  createGraph();
  animate();

  function init() {
    // Three.js initialization
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );

    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000000);
    camera.position.z = 5000;

    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 5.2;
    controls.panSpeed = 1;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];

    controls.addEventListener('change', render);

    scene = new THREE.Scene();

    // Node geometry
    if(that.layout === "3d") {
      geometry = new THREE.SphereGeometry( 50, 50, 50 );
    } else {
      geometry = new THREE.CubeGeometry( 50, 50, 0 );
    }

    // Create node selection, if set
    if(that.selection) {
      object_selection = new THREE.ObjectSelection({
        domElement: renderer.domElement,
        selected: function(obj) {
          // display info
          if(obj != null) {
            info_text.select = "Объект " + obj.id;
          } else {
            delete info_text.select;
          }
        },
        clicked: function(obj) {
        }
      });
    }

    document.body.appendChild( renderer.domElement );

    // Stats.js
    if(that.show_stats) {
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.top = '0px';
      document.body.appendChild( stats.domElement );
    }

    // Create info box
    if(that.show_info) {
      var info = document.createElement("div");
      var id_attr = document.createAttribute("id");
      id_attr.nodeValue = "graph-info";
      info.setAttributeNode(id_attr);
      document.body.appendChild( info );
    }
  }


  /**
   *  Creates a graph with random nodes and edges.
   *  Number of nodes and edges can be set with
   *  numNodes and numEdges.
   */
  function createGraph() {
      
//    var node = new Node(0);
//    node.data.title = "This is node " + node.id;
//    graph.addNode(node);
//    drawNode(node);
//    
//    var nodes = [];
//    nodes.push(node);
//    
//    var steps = 1;
//    while(nodes.length != 0 && steps < that.nodes_count) {
//      var node = nodes.shift();
//    
//      var numEdges = randomFromTo(1, that.edges_count);
//      for(var i=1; i <= numEdges; i++) {
//        var target_node = new Node(i*steps);
//        if(graph.addNode(target_node)) {
//          target_node.data.title = "This is node " + target_node.id;
//    
//          drawNode(target_node);
//          nodes.push(target_node);
//          if(graph.addEdge(node, target_node)) {
//            drawEdge(node, target_node);
//          }
//        }
//      }
//      steps++;
//    }
		
		var nodesData = networkData.nodes;
		
		var nodeMap = {};
		var node;
		
		groupColors = {};
		var groupIndex = 0;
		nodesData.forEach(function(nodeData){
			node = new Node(nodeData.id);
			node.data.title = nodeData.label;
			if(nodeData.group){
				node.data.group = nodeData.group;	
				if(nodeData.group && !groupColors[nodeData.group]){
					groupColors[nodeData.group] = colorPalette[groupIndex].color.background;
					groupIndex++;
				}
			}
				
			graph.addNode(node);
			drawNode(node);
			nodeMap[nodeData.id] = node;
		});
		
		var edgesData = networkData.edges;
		
		edgesData.forEach(function(edgeData){
			if(nodeMap[edgeData.from] && nodeMap[edgeData.to]){
				if(graph.addEdge(nodeMap[edgeData.from], nodeMap[edgeData.to])) {
					drawEdge(nodeMap[edgeData.from], nodeMap[edgeData.to]);
				}
			}
		});

    that.layout_options.width = that.layout_options.width || 2000;
    that.layout_options.height = that.layout_options.height || 2000;
    that.layout_options.iterations = that.layout_options.iterations || 100000;
    that.layout_options.layout = that.layout_options.layout || that.layout;
    graph.layout = new Layout.ForceDirected(graph, that.layout_options);
    graph.layout.init();
    info_text.nodes = "Узлы " + graph.nodes.length;
    info_text.edges = "Ребра " + graph.edges.length;
  }


  /**
   *  Create a node object and add it to the scene.
   */
  function drawNode(node) {
		
    //var draw_object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {  color: Math.random() * 0xffffff, opacity: 0.5 } ) );
		var color = groupColors[node.data.group] ? groupColors[node.data.group] : "#97C2FC";
		var draw_object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {  color: color, opacity: 1 } ) );

    if(that.show_labels) {
      if(node.data.title != undefined) {
        var label_object = new THREE.Label(node.data.title);
      } else {
        var label_object = new THREE.Label(node.id);
      }
      node.data.label_object = label_object;
      scene.add( node.data.label_object );
    }

    var area = 5000;
    draw_object.position.x = Math.floor(Math.random() * (area + area + 1) - area);
    draw_object.position.y = Math.floor(Math.random() * (area + area + 1) - area);

    if(that.layout === "3d") {
      draw_object.position.z = Math.floor(Math.random() * (area + area + 1) - area);
    }

    draw_object.id = node.id;
    node.data.draw_object = draw_object;
    node.position = draw_object.position;
    scene.add( node.data.draw_object );
  }


  /**
   *  Create an edge object (line) and add it to the scene.
   */
  function drawEdge(source, target) {
      //material = new THREE.LineBasicMaterial({ color: 0xff0000, opacity: 1, linewidth: 0.5 });
			material = new THREE.LineBasicMaterial({ color: 0xD3D3D3, opacity: 1, linewidth: 0.5 });

      var tmp_geo = new THREE.Geometry();
      tmp_geo.vertices.push(source.data.draw_object.position);
      tmp_geo.vertices.push(target.data.draw_object.position);

      line = new THREE.Line( tmp_geo, material, THREE.LinePieces );
      line.scale.x = line.scale.y = line.scale.z = 1;
      line.originalScale = 1;

      geometries.push(tmp_geo);

      scene.add( line );
  }


  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
    if(that.show_info) {
      printInfo();
    }
  }


  function render() {
    // Generate layout if not finished
    if(!graph.layout.finished) {
      info_text.calc = "<span style='color: red'>Выполнение отрисовки...</span>";
      graph.layout.generate();
    } else {
      info_text.calc = "";
    }

    // Update position of lines (edges)
    for(var i=0; i<geometries.length; i++) {
      geometries[i].verticesNeedUpdate = true;
    }


    // Show labels if set
    // It creates the labels when this options is set during visualization
    if(that.show_labels) {
      var length = graph.nodes.length;
      for(var i=0; i<length; i++) {
        var node = graph.nodes[i];
        if(node.data.label_object != undefined) {
          node.data.label_object.position.x = node.data.draw_object.position.x;
//          node.data.label_object.position.y = node.data.draw_object.position.y - 100;
          node.data.label_object.position.y = node.data.draw_object.position.y - 150;
          node.data.label_object.position.z = node.data.draw_object.position.z;
          node.data.label_object.lookAt(camera.position);
        } else {
          if(node.data.title != undefined) {
            var label_object = new THREE.Label(node.data.title, node.data.draw_object);
          } else {
            var label_object = new THREE.Label(node.id, node.data.draw_object);
          }
          node.data.label_object = label_object;
          scene.add( node.data.label_object );
        }
      }
    } else {
      var length = graph.nodes.length;
      for(var i=0; i<length; i++) {
        var node = graph.nodes[i];
        if(node.data.label_object != undefined) {
          scene.remove( node.data.label_object );
          node.data.label_object = undefined;
        }
      }
    }

    // render selection
    if(that.selection) {
      object_selection.render(scene, camera);
    }

    // update stats
    if(that.show_stats) {
      stats.update();
    }

    // render scene
    renderer.render( scene, camera );
  }

  /**
   *  Prints info from the attribute info_text.
   */
  function printInfo(text) {
    var str = '';
    for(var index in info_text) {
      if(str != '' && info_text[index] != '') {
        str += " - ";
      }
      str += info_text[index];
    }
    document.getElementById("graph-info").innerHTML = str;
  }

  // Generate random number
  function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  // Stop layout calculation
  this.stop_calculating = function() {
    graph.layout.stop_calculating();
  }
}
