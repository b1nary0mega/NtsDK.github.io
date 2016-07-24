var getRandomInt = fabric.util.getRandomInt;

var Utils = {};

Utils.rainbow = ["#ffcc66", "#ff6fcf", "#ff6666", "#ccff66", "#66ccff"];
Utils.rainbowEnd = Utils.rainbow.length - 1;
//Utils.$ = function(id){return document.getElementById(id)};

function getEl(id){return document.getElementById(id)};

function listen(el, event, listener) {
    el.addEventListener(event, listener);
};

function makeText(text) {
    return document.createTextNode(text);
};

function addEl(parent, child) {
    parent.appendChild(child);
    return parent;
};

Utils.removeChildren = function (myNode) {
    "use strict";
    if (!myNode) {
        return;
    }
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
};


function clearEl(el){
    Utils.removeChildren(el);
    return el;
  };

//var FIELD_SIZE_X = 600;
//var FIELD_SIZE_Y = 500;
//var CLUSTER_SIZE = 40;
//var dotNumber = 200;
//var clusterNumber = 3;
//var realClusterNumber = 6;


function preferences(opts){
    this.FIELD_SIZE_X = opts.FIELD_SIZE_X == undefined ? 600 : opts.FIELD_SIZE_X;
    this.FIELD_SIZE_Y = opts.FIELD_SIZE_Y == undefined ? 500 : opts.FIELD_SIZE_Y;
    this.CLUSTER_SIZE = opts.CLUSTER_SIZE == undefined ? 60 : opts.CLUSTER_SIZE;
    this.dotNumber = opts.dotNumber == undefined ? 200 : opts.dotNumber;
    this.clusterNumber = opts.clusterNumber == undefined ? 4 : opts.clusterNumber;
    this.realClusterNumber = opts.realClusterNumber == undefined ? 4 : opts.realClusterNumber;
}

Utils.makeDots2 = function(prefs){
    //var prefs = opts == undefined ? new preferences({}) : new preferences(opts);
    var dotArray = [];
    var meanClusterSize = Math.floor(prefs.dotNumber/prefs.realClusterNumber);
    for (var i = 0, len = prefs.realClusterNumber; i < len; i++){
        var clusterX = getRandomInt(0, prefs.FIELD_SIZE_X);
        var clusterY = getRandomInt(0, prefs.FIELD_SIZE_Y);

        for (var j = 0, len2 = meanClusterSize; j < len2; j++) {
            dotArray[i*meanClusterSize+j] = {x:clusterX+getRandomInt(-prefs.CLUSTER_SIZE, prefs.CLUSTER_SIZE),
                y:clusterY+getRandomInt(-prefs.CLUSTER_SIZE, prefs.CLUSTER_SIZE)};
        }
    }
    return dotArray;
}

//Utils.makeDots = function(prefs){
//    //var prefs = opts == undefined ? new preferences({}) : new preferences(opts);
//    var dotArray = [];
//    for (var i = 0, len = prefs.dotNumber; i < len; i++) {
//        dotArray[i] = {x:getRandomInt(0, prefs.FIELD_SIZE_X),y:getRandomInt(0, prefs.FIELD_SIZE_Y)};
//    }
//    return dotArray;
//}

Utils.makeClusterCenters2 = function(dotArray, prefs){
    var centersArray = [];
    var index = [];
    var counter = prefs.clusterNumber;
    while(counter!=0){
        var randomVal = getRandomInt(0, dotArray.length-1);
        if(index[randomVal]==undefined){
            centersArray[counter-1]={x:dotArray[randomVal].x,y:dotArray[randomVal].y};

            index[randomVal]=1;
            counter--;
        }
    }
    return centersArray;
}

//Utils.makeClusterCenters = function(prefs){
//    var centersArray = [];
//    for (var i = 0, len = prefs.clusterNumber; i < len; i++) {
//        centersArray[i] = {x:getRandomInt(0, prefs.FIELD_SIZE_X),y:getRandomInt(0, prefs.FIELD_SIZE_Y)};
//    }
//    return centersArray;
//}


Utils.euclidusDistance = function(arr1, arr2){
    var dist = 0;
    for (var i = 0, len = arr1.length; i < len; i++) {
        dist+=(arr1[i]-arr2[i])*(arr1[i]-arr2[i]);
    }
    return Math.sqrt(dist);
}

Utils.euclidusPointDistance = function(point1, point2){
    return Math.sqrt((point1.top-point2.top)*(point1.top-point2.top)+
        (point1.left-point2.left)*(point1.left-point2.left));
}

Utils.euclidusSquarePointDistance = function(point1, point2){
    return (point1.top-point2.top)*(point1.top-point2.top)+
        (point1.left-point2.left)*(point1.left-point2.left);
}

Utils.manhattanPointDistance = function(point1, point2){
    return Math.abs(point1.top-point2.top)+Math.abs(point1.left-point2.left);
}

Utils.chebyshovPointDistance = function(point1, point2){
    return Math.max(Math.abs(point1.top-point2.top),Math.abs(point1.left-point2.left));
}

Utils.minkovskyPointDistance = function(point1, point2, r){
    return Math.pow(Math.pow(Math.abs(point1.top-point2.top),r)+Math.pow(Math.abs(point1.left-point2.left),r),1/r);
}

Utils.extend = function(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}


Utils.hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

//Utils.rgbToHex = function(r, g, b) {
//    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
//}

Utils.rgbToHex = function(rgb) {
    return "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
}