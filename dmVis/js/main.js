var prefs;
var dots;
var centers;

var generateData = function(){
    prefs = new preferences({});
    dots = Utils.makeDots2(prefs);
    //dots = Utils.makeDots(prefs);
    centers = Utils.makeClusterCenters2(dots, prefs);
};


function init(){

    generateData();
    var vis = [];
    vis.push(new fuzzyCMeansVisualisator(getEl('metrixName1'), getEl('c1'), dots, centers, prefs, {
        countDistance : Utils.manhattanPointDistance
    }));
    vis.push(new KMeansVisualisator(getEl('metrixName2'),getEl('c2'), dots, centers, prefs, {
        countDistance : Utils.manhattanPointDistance
    }));

    var nextIteration = function() {
        for (var i = 0, len = vis.length; i < len; i++) {
            vis[i].nextIteration();
            vis[i].render();
//            var metrixNameDiv = getEl('metrixName' + (i + 1));
//            metrixNameDiv.innerHTML = vis[i].getMetrixName();
            var isEndedDiv = getEl('isEnded' + (i + 1));
            isEndedDiv.innerHTML = "Iterations number: " + vis[i].getIterationsNumber() + ", is ended: " + vis[i].isEnded();
        }
    };
    
    listen(getEl('nextButton'), 'click', nextIteration);

    listen(resetButton, 'click', function() {
        generateData();
        for (var i = 0, len = vis.length; i < len; i++){
            vis[i].reset(dots, prefs,centers);
        }
    });

    var timerMulti;
    var startAutoExecute = function(){
        if(timerMulti){
            window.clearInterval(timerMulti);
        }
        timerMulti = window.setInterval(nextIteration, 1000);
    };
    var stopAutoExecute = function(){
        if(timerMulti){
            window.clearInterval(timerMulti);
        }
    };
    
    listen(getEl('startAutoExecuteButton'), 'click', startAutoExecute);
    listen(getEl('stopAutoExecuteButton'), 'click', stopAutoExecute);
//    distancesTest();
}

//function distancesTest(){
//    var point1 = {left:0,top:0};
//    var point2 = {left:4, top:5};
//
//    var texter = getEl('texter');
//    texter.innerHTML = texter.innerHTML + " " + Utils.euclidusPointDistance(point1,point2);
//    texter.innerHTML = texter.innerHTML + " " + Utils.euclidusSquarePointDistance(point1,point2);
//    texter.innerHTML = texter.innerHTML + " " + Utils.manhattanPointDistance(point1,point2);
//    texter.innerHTML = texter.innerHTML + " " + Utils.chebyshovPointDistance(point1,point2);
//    texter.innerHTML = texter.innerHTML + " " + Utils.minkovskyPointDistance(point1,point2,1);
//    texter.innerHTML = texter.innerHTML + " " + Utils.minkovskyPointDistance(point1,point2,2);
//    texter.innerHTML = texter.innerHTML + " " + Utils.minkovskyPointDistance(point1,point2,3);
//}
