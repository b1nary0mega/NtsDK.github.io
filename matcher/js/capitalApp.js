/*Copyright 2017 Timofey Rechkalov <ntsdk@yandex.ru>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
   limitations under the License. */

"use strict";

((exports)=>{
    
    var state = {};
    
    var checkboxList = [
        "show-country",
        "show-continent",
        "show-seed-capital-mark",
        "show-capital-marks",
        "show-shortest-paths"
    ];
    
    
    exports.init = () => {
//        queryEl('body').innerHTML = JSON.stringify(Data.capitals); 
      ymaps.ready(() => {
        dragula([queryEl('.capitalsList')]);
        listen(queryEl('.start-game'), 'click', startGame);
        listen(queryEl('.end-game'), 'click', endGame);
        UI.initPanelTogglers();
        state.map = new ymaps.Map ("map", {
            center: [55.76, 37.64], 
            zoom: 2
        });
        state.map.behaviors.enable('scrollZoom');
      });
      
      checkboxList.forEach(el => queryEl('.' + el).checked = true);
      checkboxList.forEach(el => listen(queryEl('.' + el),'change', startGame));
      listen(queryEl('.capital-number'),'change', startGame);
      queryEl('.full-capital-list').checked = false;
      queryEl('.capital-number').value = 5;
      queryEl('.min-capital-dist').value = 300;
    };
    
    var bubbleSort = (arr) => {
        var swaps = 0;
        var tmp;
        for(var i=0;i<arr.length;i++){
            for(var j=i+1;j<arr.length;j++){
                if(arr[i].distance > arr[j].distance){
                    tmp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = tmp;
                    swaps++;
                }
            }
        }
        return swaps;
    };
    
    var endGame = () => {
        var divs = queryEls('.capitalsList div');
        var capitalNames = divs.map(el => getAttr(el,'name'));
        
        var caps = R.indexBy(R.prop('name'), state.capitals);
        
        divs.forEach(el => {
            var name = getAttr(el,'name');
            addEl(clearEl(queryElEl(el, '.dist')), makeText(' (' + Math.round(caps[name].distance/1000) + ' км)'))
        });
        
        var capsArr = capitalNames.map(el => caps[el]);
        var swaps = bubbleSort(capsArr);
        var max = state.capitalNum*(state.capitalNum-1)/2;
        var score = max - swaps;
        Utils.alert(score + ' из ' + max);
        
        state.capitals.map(addShortestPath(true, state.seedCapital));
        addCapital(state.seedCapital, true);
        state.capitals.map(addCapital(R.__, false));
    };
    
    
    var startGame = () => {
        
        addClass(queryEl('.container-fluid .intro-panel .panel-body'), 'hidden');
        
        state.map.geoObjects.removeAll();
        state.capitalNum = Number(queryEl('.capital-number').value);
        
        var names = R.keys(Data.capitals);
        
        if(!queryEl('.full-capital-list').checked){
            names = names.filter(name => !R.contains(Data.capitals[name].enCountry, Data.extraCountryList));
        }
        
        
        names = shuffle(names);
        state.seedCapital = R.clone(Data.capitals[names[0]]);
        var tries = 10000;
        var ok = false;
//        var rest = R.tail(names);
        var minDist = Number(queryEl('.min-capital-dist').value)*1000;
        while(tries > 0 && !ok){
            names = shuffle(names);
            state.seedCapital = R.clone(Data.capitals[names[0]]);
//            rest = shuffle(rest);
            state.capitals = R.clone(R.values(R.pick(R.slice(1, 1+state.capitalNum, names), Data.capitals)));
            state.capitals.map(el => el.distance = getDistance(state.seedCapital.coords, el.coords));
            var distances = state.capitals.map(R.prop('distance'));
            distances.sort();
            
            if(R.aperture(2, distances).every(el => (el[1]-el[0]) > minDist)){
                ok = true;
                break;
            }
            tries--;
        }
        if(!ok){
            Utils.alert('Не удалось подобрать подходящий набор столиц. Попробуйте уменьшить минимальное расстояние между столицами от главной.');
            return;
        }
        
        
        console.log(state.seedCapital);
        console.log(state.capitals);
        
        
        if(queryEl('.show-seed-capital-mark').checked){
            addCapital(state.seedCapital, true);
        }
        
        if(queryEl('.show-capital-marks').checked){
            state.capitals.map(addCapital(R.__, false));
        }
        
        addEl(clearEl(queryEl('.seedCapital')), makeCapitalLine(state.seedCapital));
        
        addEls(clearEl(queryEl('.capitalsList')), state.capitals.map(makeCapitalLine));
        
        if(queryEl('.show-shortest-paths').checked){
            state.capitals.map(addShortestPath(false, state.seedCapital));
        }
        
    };
    
    var makeCapitalLine = (cap) =>{
        var img = setAttr(makeEl('img'), 'src', 'flags/' + cap.alpha2.toLowerCase() + '.svg');
        addClass(img,'flag');
        var text = cap.name;
        if(queryEl('.show-country').checked){
            text += ', ' + cap.country;
        }
        if(queryEl('.show-continent').checked){
            text += ', ' + cap.continent;
        }
        var div = setAttr(addClass(makeEl('div'), 'capitalLine'), 'name', cap.name);
        return addEls(div, [img, addEl(makeEl('span'), makeText(text)), addClass(makeEl('span'), 'dist')]);
    };
    
    var getDistance = R.curry((startPoint, endPoint) => ymaps.coordSystem.geo.solveInverseProblem(startPoint, endPoint).distance);
    
    var addShortestPath = R.curry((showKm, cap1, cap2) => {
        var hint = cap1.name + "-" + cap2.name;
        if(showKm) {
            hint = hint + ' (' + Math.round(cap2.distance/1000) + ' км)';
        }
        
        var myGeoObject = new ymaps.GeoObject({
        // Описываем геометрию типа "Ломаная линия".
        geometry: {
            type: "LineString",
            coordinates: [
                cap1.coords, cap2.coords
            ]
        },
        // Описываем данные геообъекта.
        properties: {
            hintContent: hint
        }
        }, {
            // Включаем отображение в форме геодезических кривых.
            geodesic: true,
            // Задаем ширину в 5 пикселей.
            strokeWidth: 5,
            // Задаем цвет линии.
            strokeColor: "#F008"
        });
        // Добавляем геообъект на карту.
        state.map.geoObjects.add(myGeoObject);
    });
    
    var addCapital = R.curry((capital, isSeed) => {
        var myPlacemark = new ymaps.Placemark(capital.coords, { 
//            balloonContent: JSON.stringify(arr),
            iconContent: capital.name
        }, {
            preset: isSeed ? 'islands#greenStretchyIcon' : 'islands#blueStretchyIcon', 
        });
        
        state.map.geoObjects.add(myPlacemark);
    });
    
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
})(this['app']={});