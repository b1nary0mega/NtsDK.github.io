/**
  @author David Piegza

  Implements a force-directed layout, the algorithm is based on Fruchterman and Reingold and
  the JUNG implementation.

  Needs the graph data structure Graph.js:
  https://github.com/davidpiegza/Graph-Visualization/blob/master/Graph.js

  Parameters:
  graph - data structure
  options = {
    layout: "2d" or "3d"
    attraction: <float>, attraction value for force-directed layout
    repulsion: <float>, repulsion value for force-directed layout
    iterations: <int>, maximum number of iterations
    width: <int>, width of the viewport
    height: <int>, height of the viewport

    positionUpdated: <function>, called when the position of the node has been updated
  }
  
  Examples:
  
  create:
  layout = new Layout.ForceDirected(graph, {width: 2000, height: 2000, iterations: 1000, layout: "3d"});
  
  call init when graph is loaded (and for reset or when new nodes has been added to the graph):
  layout.init();
  
  call generate in a render method, returns true if it's still calculating and false if it's finished
  layout.generate();


  Feel free to contribute a new layout!

 */

var Layout = Layout || {};

Layout.ForceDirected = function(graph, options) {
  var options = options || {};
  
  this.layout = options.layout || "2d";
  this.attraction_multiplier = options.attraction || 5;
  this.repulsion_multiplier = options.repulsion || 0.75;
  this.max_iterations = options.iterations || 1000;
  this.graph = graph;
  this.width = options.width || 200;
  this.height = options.height || 200;
  this.finished = false;

  var callback_positionUpdated = options.positionUpdated;
  
  var EPSILON = 0.000001;
  var attraction_constant;
  var repulsion_constant;
  var forceConstant;
  var layout_iterations = 0;
  var temperature = 0;
  var nodes_length;
  var edges_length;
  var that = this;
  
  // performance test
  var mean_time = 0;

  /**
   * Initialize parameters used by the algorithm.
   */
  this.init = function() {
    this.finished = false;
    temperature = this.width / 10.0;
    nodes_length = this.graph.nodes.length;
    edges_length = this.graph.edges.length;
    forceConstant = Math.sqrt(this.height * this.width / nodes_length);
    attraction_constant = this.attraction_multiplier * forceConstant;
    repulsion_constant = this.repulsion_multiplier * forceConstant;
  };

  
  var get = function(layout, value){
      var obj = {};
      value = value || 0;
      obj.x = value;
      obj.y = value;
      if(layout === "3d") {
          obj.z = value;
      }
      return obj;
  }
  
  function initIfNeed(parent, child){
      if(!parent[child]){
          parent[child] = {};
      }
  }
  
  function or(layout, dstObj, baseObj){
      dstObj.x = dstObj.x || baseObj.x;
      dstObj.y = dstObj.y || baseObj.y;
      if(layout === "3d") {    
          dstObj.z = dstObj.z || baseObj.z;
      }
  }
  
  function add(layout, sub1, sub2){
      var res = {};
      res.x = sub1.x + sub2.x;
      res.y = sub1.y + sub2.y;
      if(layout === "3d") {
          res.z = sub1.z + sub2.z;
      }
      return res;
  }
  
  function sub(layout, sub1, sub2){
      var res = {};
      res.x = sub1.x - sub2.x;
      res.y = sub1.y - sub2.y;
      if(layout === "3d") {
          res.z = sub1.z - sub2.z;
      }
      return res;
  }
  
  function sum(arr){
      return arr.x+arr.y + (arr.z?arr.z:0);
  }
  
  function mul(layout, mul1, mul2){
      var res = {};
      res.x = mul1.x * mul2.x;
      res.y = mul1.y * mul2.y;
      if(layout === "3d") {
          res.z = mul1.z * mul2.z;
      }
      return res;
  }
  
  function div(layout, mul1, mul2){
      var res = {};
      res.x = mul1.x / mul2.x;
      res.y = mul1.y / mul2.y;
      if(layout === "3d") {
          res.z = mul1.z / mul2.z;
      }
      return res;
  }
  
  /**
   * Generates the force-directed layout.
   *
   * It finishes when the number of max_iterations has been reached or when
   * the temperature is nearly zero.
   */
  this.generate = function() {
    if(layout_iterations < this.max_iterations && temperature > 0.000001) {
      var start = new Date().getTime();
      
      // calculate repulsion
      for(var i=0; i < nodes_length; i++) {
        var node_v = graph.nodes[i];
        node_v.layout = node_v.layout || {};
        if(i==0) {
          node_v.layout.offset = get(this.layout);
        }

        node_v.layout.force = 0;
        initIfNeed(node_v.layout,'tmp_pos');
        or(this.layout, node_v.layout.tmp_pos, node_v.position);

        for(var j=i+1; j < nodes_length; j++) {
          var node_u = graph.nodes[j];
          if(i != j) {
            node_u.layout = node_u.layout || {};
            initIfNeed(node_u.layout,'tmp_pos');
            or(this.layout, node_u.layout.tmp_pos, node_u.position);

            var delta = sub(this.layout, node_v.layout.tmp_pos, node_u.layout.tmp_pos);

            var delta_length = Math.max(EPSILON, Math.sqrt(sum(mul(this.layout, delta, delta))));
            if(this.layout === "3d") {
                var delta_length_z = Math.max(EPSILON, Math.sqrt(sum(mul(this.layout, delta, delta))));
            }

            var force = (repulsion_constant * repulsion_constant) / delta_length;
            if(this.layout === "3d") {
              var force_z = (repulsion_constant * repulsion_constant) / delta_length_z;
            }

            node_v.layout.force += force;
            node_u.layout.force += force;

            if(i==0) {
                node_u.layout.offset = get(this.layout);
            }

            var change = mul(this.layout, delta, get(this.layout, force/delta_length));
            node_v.layout.offset = add(this.layout, node_v.layout.offset, change);
            node_u.layout.offset = sub(this.layout, node_u.layout.offset, change);
          }
        }
      }
      
      // calculate attraction
      for(var i=0; i < edges_length; i++) {
        var edge = graph.edges[i];
        var delta = sub(this.layout, edge.source.layout.tmp_pos, edge.target.layout.tmp_pos);
        
        var delta_length = Math.max(EPSILON, Math.sqrt(sum(mul(this.layout, delta, delta))));
        var force = (delta_length * delta_length) / attraction_constant;

        edge.source.layout.force -= force;
        edge.target.layout.force += force;
        
        var change = mul(this.layout, delta, get(this.layout, force/delta_length));
        edge.source.layout.offset = sub(this.layout, edge.source.layout.offset, change);
        edge.target.layout.offset = add(this.layout, edge.target.layout.offset, change);
      }
      
      // calculate positions
      for(var i=0; i < nodes_length; i++) {
        var node = graph.nodes[i];
        var delta_length = Math.max(EPSILON, Math.sqrt(sum(mul(this.layout, node.layout.offset, node.layout.offset))));

        node.layout.tmp_pos = add(this.layout, node.layout.tmp_pos, mul(this.layout, node.layout.offset, get(this.layout, Math.min(delta_length, temperature) / delta_length)))

        var updated = true;
        var posChange = div(this.layout, sub(this.layout, node.position, node.layout.tmp_pos), get(this.layout, 10));
        // error on ovewriting node.position, this is an draw_object position
//        node.position = sub(this.layout, node.position, posChange);
        var tmp = sub(this.layout, node.position, posChange);
//        var val = (node.position.y-node.layout.tmp_pos.y)/10;
        node.position.x = tmp.x;
        node.position.y =  tmp.y;
        
        if(this.layout === "3d") {    
            node.position.z = tmp.z;
        }
        
        // execute callback function if positions has been updated
        if(updated && typeof callback_positionUpdated === 'function') {
          callback_positionUpdated(node);
        }
      }
      temperature *= (1 - (layout_iterations / this.max_iterations));
      layout_iterations++;

      var end = new Date().getTime();
      mean_time += end - start;
    } else {
      if(!this.finished) {        
        console.log("Average time: " + (mean_time/layout_iterations) + " ms");
      }
      this.finished = true;
      return false;
    }
    return true;
  };

  /**
   * Stops the calculation by setting the current_iterations to max_iterations.
   */
  this.stop_calculating = function() {
    layout_iterations = this.max_iterations;
  }
};
