function KMeansVisualisator(header, id, coordDotArray, coordCentersArray, dataPrefs, opts){
    this.canvas = new fabric.Canvas(id, {
        //canvas = new fabric.StaticCanvas('c', {
        hoverCursor: 'pointer',
        selection: true,
        backgroundColor: "#fafafa"
    });
    
    addEl(header, makeText("K-Means"));

    this.canvas.on({
        'object:moving': function(e) {
            e.target.opacity = 0.5;
        },
        'object:modified': function(e) {
            e.target.opacity = 1;
        }
    });
    this.countDistance = opts && opts.countDistance ? opts.countDistance: Utils.euclidusPointDistance;
//    this.metrixName = opts && opts.metrixName ? opts.metrixName: "Euclidus";

    this.reset(coordDotArray, dataPrefs, coordCentersArray, opts);
}

KMeansVisualisator.prototype.getIterationsNumber = function(){
    return this.iterationsNumber;
}

//KMeansVisualisator.prototype.getMetrixName = function(){
//    return this.metrixName;
//}

KMeansVisualisator.prototype.isEnded = function(){
    for (var i = 0, len = this.dataPrefs.clusterNumber; i < len; i++) {
        if(Utils.euclidusDistance([this.prevCentersArray[i].left,this.prevCentersArray[i].top],
            [this.centersArray[i].left,this.centersArray[i].top])>5){
            return false;
        }
    }
    return true;
}

KMeansVisualisator.prototype.reset = function(coordDotArray, dataPrefs, coordCentersArray, opts){
    this.canvas.clear();
    this.iterationsNumber = 0;

    this.showTrack = true;
    this.coordDotArray = coordDotArray;
    this.coordCentersArray = coordCentersArray;
    this.dataPrefs = dataPrefs;

    this.scale = this.makeScaleFunction(this.coordDotArray);
    this.dotArray = this.initDots(this.coordDotArray);
    this.centersArray = this.initClusterCenters2(this.coordCentersArray);
    this.clusterConvexHullArray = this.initClusterConvexHullArray(this.dataPrefs.clusterNumber, this.canvas);

    this.updateClusters();
    this.colorClusters();
    this.updateClusterConvexHulls();

    this.render();
    this.canvas.renderAll();
}

KMeansVisualisator.prototype.render = function(){
    this.canvas.renderAll();
}

KMeansVisualisator.prototype.nextIteration = function(){
    if(this.prevCentersArray && this.isEnded()) return;
    this.updateClusterCenters();
    this.updateClusters();
    this.colorClusters();
    this.updateClusterConvexHulls();
    this.iterationsNumber++;
}

KMeansVisualisator.prototype.updateClusterCenters = function(){

    this.prevCentersArray = [];
    for (var i = 0, len = this.clusters.length; i < len; i++) {
        this.prevCentersArray[i] = this.centersArray[i].clone();
    }

    for (var i = 0, len = this.clusters.length; i < len; i++) {
        if(this.clusters[i].length==0){
            continue;
        }
        var oldCenter;
        if(this.showTrack){
            oldCenter = this.centersArray[i].clone();
            oldCenter.setOpacity(0.5);
            this.canvas.add(oldCenter);
        }
        var x=0, y=0;
        for(var j = 0, len2 = this.clusters[i].length; j < len2; j++){
            x+=this.clusters[i][j].left;
            y+=this.clusters[i][j].top;
        }
        x/=this.clusters[i].length;
        y/=this.clusters[i].length;
        this.centersArray[i].setLeft(x);
        this.centersArray[i].setTop(y);
        if(this.showTrack){
            var line = new fabric.Line([oldCenter.left, oldCenter.top,
                                        this.centersArray[i].left, this.centersArray[i].top]);
            this.canvas.add(line);
//            this.canvas.add(new fabric.Line([oldCenter.left, oldCenter.top,
//                                             this.centersArray[i].left, this.centersArray[i].top], {
//                fill: Utils.rainbow[i],
//                strokeWidth: 4,
//                opacity: 0.7
//            }));
        }
    }
}

KMeansVisualisator.prototype.updateClusterConvexHulls = function(){
    for (var i = 0, len = this.clusters.length; i < len; i++) {
        if(this.clusters[i].length ==0){
            continue;
        }
        var points2 = this.dots2_CH_points(this.clusters[i]);
        var polyLineSource = getConvexHull(points2);
        var points = this.CH_points2points(polyLineSource);
        this.clusterConvexHullArray[i].initialize(points, {
            stroke: Utils.rainbow[i],
            strokeWidth: 5,
            fill: Utils.rainbow[i],
            opacity: 0.1
        });
    }
}

KMeansVisualisator.prototype.initClusterConvexHullArray = function(){
    var clusterConvexHullArray = [];
    for (var i = 0, len = this.dataPrefs.clusterNumber; i < len; i++) {
        var poly = new fabric.Polygon([[0,0]], {
            stroke: Utils.rainbow[i],
            strokeWidth: 5,
            opacity: 0.1
        });
        clusterConvexHullArray[i] = poly;
        this.canvas.add(poly);
    }
    return clusterConvexHullArray;
}




KMeansVisualisator.prototype.makeScaleFunction = function(coordDotArray){
    var maxX,minX, maxY, minY;
    maxX=minX=coordDotArray[0].x;
    maxY=minY=coordDotArray[0].y;
    for (var i = 1, len = coordDotArray.length; i < len; i++) {
        if(maxX<coordDotArray[i].x){
            maxX=coordDotArray[i].x;
        }
        if(minX>coordDotArray[i].x){
            minX=coordDotArray[i].x;
        }
        if(maxY<coordDotArray[i].y){
            maxY=coordDotArray[i].y;
        }
        if(minY>coordDotArray[i].y){
            minY=coordDotArray[i].y;
        }
    }

    var height = this.canvas.getHeight();
    var width = this.canvas.getWidth();
    maxX+=10;
    maxY+=10;
    minX-=10;
    minY-=10;

    var offsetX = -minX;
    var offsetY = -minY;
    var scaleCoeffX = (maxX-minX)/width;
    var scaleCoeffY = (maxY-minY)/height;

    return function(dot){
        return {x:(dot.x+offsetX)/scaleCoeffX,y:(dot.y+offsetY)/scaleCoeffY };
    }
}



KMeansVisualisator.prototype.initDots = function(coordDotArray){

    var dotArray = [];
    for (var i = 0, len = coordDotArray.length; i < len; i++) {
        var scaledDot = this.scale(coordDotArray[i]);
        var dot = new fabric.Circle({
            left:   scaledDot.x,
            top:    scaledDot.y,
            radius: 3,
            fill: "#0f0f0f"
        });
        dotArray[i] = dot;
        this.canvas.add(dot);
    }
    return dotArray;
}

KMeansVisualisator.prototype.initClusterCenters2 = function(coordClusterCentersArray){
    var dotArray = [];
    for (var i = 0, len = coordClusterCentersArray.length; i < len; i++) {
        var scaledDot = this.scale(coordClusterCentersArray[i]);
        var dot = new fabric.Circle({
            left:   scaledDot.x,
            top:    scaledDot.y,
            radius: 5,
            fill: Utils.rainbow[i]
        });
        dot.set({ strokeWidth: 1, stroke: 'rgba(0,0,0,1)' });
        dotArray[i] = dot;
        this.canvas.add(dot);
    }
    return dotArray;
}

KMeansVisualisator.prototype.colorClusters = function() {
    for(var i = 0, len = this.clusters.length; i < len; i++){
        for(var j = 0, len2 = this.clusters[i].length; j < len2; j++){
            this.clusters[i][j].set("fill",Utils.rainbow[i]);
        }
    }
}

KMeansVisualisator.prototype.updateClusters = function(){
    this.clusters = [];
    for (var i = 0, len = this.centersArray.length; i < len; i++) {this.clusters[i]=[]};
    for (var i = 0, len = this.dotArray.length; i < len; i++) {
        var point = this.dotArray[i];
        var firstDistance = this.countDistance(point, this.centersArray[0]);
        var clusterIndex = 0;
        for (var j = 1, len2 = this.centersArray.length; j < len2; j++){
            var secondDistance = this.countDistance(point, this.centersArray[j]);
            if(secondDistance < firstDistance){
                firstDistance = secondDistance;
                clusterIndex = j;
            }
        }
        var clusterSize = this.clusters[clusterIndex].length;
        this.clusters[clusterIndex][clusterSize] = this.dotArray[i];
    }
}

KMeansVisualisator.prototype.CH_points2points = function(polyLineSource){
    var points = [];
    for(var i= 0,len = polyLineSource.length;i<len;++i){
        points[i]={x:polyLineSource[i][0][0], y:polyLineSource[i][0][1]};
    }
    return points;
}

KMeansVisualisator.prototype.dots2_CH_points = function(dotArray) {
    var points2 = [];
    for (var i = 0, len = dotArray.length; i < len; i++) {
        //points[i]={x:dotArray[i].left, y:dotArray[i].top};
        points2[i] = [dotArray[i].left, dotArray[i].top];
    }
    return points2;
}
