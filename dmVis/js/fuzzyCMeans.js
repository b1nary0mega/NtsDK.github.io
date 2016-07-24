function fuzzyCMeansVisualisator(header){
    this.p = 2;
    fuzzyCMeansVisualisator.superclass.constructor.apply(this, arguments);
    addEl(clearEl(header), makeText("Fuzzy c-Means"));
}

Utils.extend(fuzzyCMeansVisualisator, KMeansVisualisator);

fuzzyCMeansVisualisator.prototype.updateClusterConvexHulls = function(){

}

fuzzyCMeansVisualisator.prototype.updateClusters = function(){
    this.clusters = [];
    for (var i = 0, len = this.centersArray.length; i < len; i++) {this.clusters[i]=[]};
    for (var i = 0, len = this.dotArray.length; i < len; i++) {
        var accum = 0;
        var dotBelongClusterArray = [];
        var tmp = 0;
        var point = this.dotArray[i];
        for (var j = 0, len2 = this.centersArray.length; j < len2; j++){
            //var distance = this.countDistance(point, this.centersArray[j]);
            tmp = this.weightSubCounter(point, this.centersArray[j]);
            accum+=tmp;
            dotBelongClusterArray[j] = tmp;
        }
        for (var j = 0, len2 = this.centersArray.length; j < len2; j++){
            dotBelongClusterArray[j] /= accum;
        }
        this.clusters[i] = dotBelongClusterArray;
    }
}

fuzzyCMeansVisualisator.prototype.weightSubCounter = function(point, centroid){
    var distance = this.countDistance(point, centroid);
    var result = Math.pow(1/(0.0000001+distance*distance),1/(this.p-1));
    return result;
}


fuzzyCMeansVisualisator.prototype.updateClusterCenters = function(){

    this.prevCentersArray = [];
    var newCentersCoords = [];
    var weightSum = [];
    for (var i = 0, len = this.centersArray.length; i < len; i++) {
        this.prevCentersArray[i] = this.centersArray[i].clone();
        newCentersCoords[i]={x:0,y:0};
        weightSum[i]=0;
    }


    for (var i = 0, len = this.clusters.length; i < len; i++) {
        for(var j = 0, len2 = this.clusters[i].length; j < len2; j++){
//            newCentersCoords[j].x+=this.clusters[i][j]*this.dotArray[i].left;
//            newCentersCoords[j].y+=this.clusters[i][j]*this.dotArray[i].top;
//            weightSum[j]+=this.clusters[i][j];
            newCentersCoords[j].x+=Math.pow(this.clusters[i][j],this.p)*this.dotArray[i].left;
            newCentersCoords[j].y+=Math.pow(this.clusters[i][j],this.p)*this.dotArray[i].top;
            weightSum[j]+=Math.pow(this.clusters[i][j],this.p);
        }
    }
    for (var i = 0, len = this.centersArray.length; i < len; i++){
        newCentersCoords[i].x/=weightSum[i];
        newCentersCoords[i].y/=weightSum[i];
    }

    for (var i = 0, len = this.centersArray.length; i < len; i++) {
        var oldCenter;
        if(this.showTrack){
            oldCenter = this.centersArray[i].clone();
            oldCenter.setOpacity(0.5);
            this.canvas.add(oldCenter);
        }
        this.centersArray[i].setLeft(Math.round(newCentersCoords[i].x));
        this.centersArray[i].setTop(Math.round(newCentersCoords[i].y));
        if(this.showTrack){
            this.canvas.add(new fabric.Line([oldCenter.left, oldCenter.top,
                this.centersArray[i].left, this.centersArray[i].top], {
                fill: Utils.rainbow[i],
                strokeWidth: 4,
                opacity: 0.7
            }));
        }
    }
}

fuzzyCMeansVisualisator.prototype.colorClusters = function() {
    var rgbRainbow = [];

    for(var i = 0, len = Utils.rainbow.length; i < len; i++){
        rgbRainbow[i]=Utils.hexToRgb(Utils.rainbow[i]);
    }

    for(var i = 0, len = this.clusters.length; i < len; i++){
        var rgb = {r:0,g:0,b:0};
        for(var j = 0, len2 = this.clusters[i].length; j < len2; j++){
            rgb.r+=rgbRainbow[j].r*this.clusters[i][j];
            rgb.g+=rgbRainbow[j].g*this.clusters[i][j];
            rgb.b+=rgbRainbow[j].b*this.clusters[i][j];
        }

        rgb.r=Math.round(rgb.r);
        rgb.g=Math.round(rgb.g);
        rgb.b=Math.round(rgb.b);
        this.dotArray[i].set("fill",Utils.rgbToHex(rgb));
    }


//    for(var i = 0, len = this.clusters.length; i < len; i++){
//        for(var j = 0, len2 = this.clusters[i].length; j < len2; j++){
//            this.clusters[i][j].set("fill",Utils.rainbow[i]);
//        }
//    }
//
//    for(var i = 0, len = this.clusters.length; i < len; i++){
//        for(var j = 0, len2 = this.clusters[i].length; j < len2; j++){
//            this.clusters[i][j].set("fill",Utils.rainbow[i]);
//        }
//    }
}