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
    
    var data = { 'Мурманская область': 9,
  'Санкт-Петербург': 56,
  'Самарская область': 10,
  'Свердловская область': 42,
  'Тюменская область': 8,
  'Москва': 12,
  'Новосибирская область': 22,
  'Минская область': 7,
  'Челябинская область': 18,
  'Красноярский край': 9,
  'Башкортостан': 10,
  'Московская область': 132,
  'Приморский край': 12,
  'Волгоградская область': 1,
  'Костромская область': 1,
  'Калужская область': 2,
  'Ленинградская область': 41,
  'Нижегородская область': 5,
  'Татарстан': 5,
  'Воронежская область': 7,
  'Тульская область': 4,
  'Алтайский край': 12,
  'Тверская область': 3,
  'Республика Крым': 7,
  'Омская область': 11,
  'Ростовская область': 5,
  'Ставропольский Край': 2,
  'Удмуртская республика': 3,
  'Киевская область': 2,
  'Калининградская область': 4,
  'Республика Марий Эл': 2,
  'Алматы': 2,
  'Рязанская область': 1,
  'Кемеровская область': 2,
  'Тамбовская область': 1,
  'Томская область': 4,
  'Амурская область': 3,
  'Иркутская область': 2,
  'Краснодарский край': 5,
  'Ярославская область': 3,
  'Пермский край': 2,
  'Хакасия': 2,
  'Вологодская область': 1,
  'Ижевская область': 1,
  'Хабаровский край': 2,
  'Полтавская область': 1,
  'Липецкая область': 1,
  'Оренбургская область': 1,
  'Витебская область': 1,
  'Курская область': 1,
  'Запорожская область': 1,
  'Орловская область': 1,
  'Забайкальский край': 2,
  'Днепропетровская область': 1,
  'Саратовская область': 1,
  'Камчатский край': 1 }
  
  var fullData = {"Тюменская область":{"coords":[57.541821,68.096045],"value":8},"Санкт-Петербург":{"coords":[59.939095,30.315868],"value":56},"Самарская область":{"coords":[53.27635,50.463301],"value":10},"Свердловская область":{"coords":[58.586755,61.530761],"value":42},"Мурманская область":{"coords":[67.250244,38.313668],"value":9},"Москва":{"coords":[55.753215,37.622504],"value":12},"Новосибирская область":{"coords":[55.276272,79.770236],"value":22},"Красноярский край":{"coords":[67.236779,95.968477],"value":9},"Челябинская область":{"coords":[54.446199,60.395641],"value":18},"Минская область":{"coords":[53.387641,27.461157],"value":7},"Башкортостан":{"coords":[54.2715,56.525537],"value":10},"Волгоградская область":{"coords":[49.615821,44.151406],"value":1},"Московская область":{"coords":[55.815792,37.380031],"value":132},"Костромская область":{"coords":[58.456003,43.788495],"value":1},"Приморский край":{"coords":[45.04198,134.709375],"value":12},"Ленинградская область":{"coords":[59.337013,29.608975],"value":41},"Калужская область":{"coords":[54.3718,35.445185],"value":2},"Нижегородская область":{"coords":[56.312764,44.611891],"value":5},"Тульская область":{"coords":[53.888064,37.575693],"value":4},"Воронежская область":{"coords":[50.970898,40.233395],"value":7},"Алтайский край":{"coords":[52.129671,82.530013],"value":12},"Республика Крым":{"coords":[45.389194,33.993751],"value":7},"Тверская область":{"coords":[57.093033,34.706195],"value":3},"Татарстан":{"coords":[55.350336,50.911013],"value":5},"Ростовская область":{"coords":[47.728732,41.268128],"value":5},"Омская область":{"coords":[56.103472,73.344416],"value":11},"Удмуртская республика":{"coords":[57.166784,52.796972],"value":3},"Республика Марий Эл":{"coords":[56.577278,47.936763],"value":2},"Ставропольский Край":{"coords":[44.953551,43.344521],"value":2},"Киевская область":{"coords":[50.29807,30.456149],"value":2},"Рязанская область":{"coords":[54.333363,40.62524],"value":1},"Калининградская область":{"coords":[54.754365,21.22993],"value":4},"Алматы":{"coords":[43.238286,76.945456],"value":2},"Кемеровская область":{"coords":[54.779047,87.207361],"value":2},"Краснодарский край":{"coords":[45.272365,38.951409],"value":5},"Томская область":{"coords":[58.949193,78.63728],"value":4},"Тамбовская область":{"coords":[52.680864,41.587183],"value":1},"Ярославская область":{"coords":[57.817361,39.105138],"value":3},"Амурская область":{"coords":[53.413341,127.728064],"value":3},"Иркутская область":{"coords":[57.100294,106.363305],"value":2},"Пермский край":{"coords":[59.117698,56.225679],"value":2},"Хабаровский край":{"coords":[60.567116,143.008928],"value":2},"Ижевская область":{"coords":[54.879407,20.552025],"value":1},"Вологодская область":{"coords":[60.138988,44.049618],"value":1},"Хакасия":{"coords":[53.386357,89.897078],"value":2},"Полтавская область":{"coords":[49.73238,33.778487],"value":1},"Витебская область":{"coords":[55.237495,28.73009],"value":1},"Оренбургская область":{"coords":[52.743528,53.498682],"value":1},"Запорожская область":{"coords":[47.178939,35.767196],"value":1},"Липецкая область":{"coords":[52.644554,39.149784],"value":1},"Курская область":{"coords":[51.680369,36.104872],"value":1},"Орловская область":{"coords":[52.781455,36.481042],"value":1},"Днепропетровская область":{"coords":[48.301045,34.844231],"value":1},"Саратовская область":{"coords":[51.578529,46.797223],"value":1},"Камчатский край":{"coords":[61.350179,169.782981],"value":1},"Забайкальский край":{"coords":[52.847258,116.200424],"value":2}}
  
  
  dataByMonth = R.map(month => {
    return R.mapObjIndexed((val, key) => {
      if(fullData[key] === undefined){
        console.log(key);
      }
      return {
        coords: fullData[key].coords,
        value: month[key]
      }
    }, month);
  }, dataByMonth);
  
  var monthList = R.keys(dataByMonth);
  
  console.log(dataByMonth);
    
    exports.init = () => {
      ymaps.ready(() => {
        
        
      
       /* UI.initPanelTogglers();
        listen(queryEl('.rpg-data'), 'click', fillData(1));  
        listen(queryEl('.marriage-data'), 'click', fillData(2));  
        fillData(1)();
        
        listen(queryEl('.create-data-forms'), 'click', createDataForms);
        listen(queryEl('.random-checks'), 'click', randomChecks);
        listen(queryEl('.calc-priorities'), 'click', calcPriorities);
        listen(queryEl('.match-button'), 'click', match);*/
        var map = new ymaps.Map ("map", {
            center: [55.76, 37.64], 
            zoom: 7
        });
        
        map.behaviors.enable('scrollZoom');
        
        /*
        R.keys(fullData).forEach(name => {
          var str = name + ' (' + fullData[name].value + ')';
          var myPlacemark = new ymaps.Placemark(fullData[name].coords, { 
              hintContent: str, 
              balloonContent: str,
              iconContent: fullData[name].value
          }, {
            preset: 'twirl#whiteStretchyIcon',
            
          });
          //myPlacemark.setData(33);

          map.geoObjects.add(myPlacemark);
        });*/
        
        var monthIndex = 0;
        var showData = dataByMonth[monthList[monthIndex]];
        var heatmap = null;
        
        var showHeatmap = function (Heatmap) {
          //var coordsOnly = R.unnest(R.values(fullData).map(el => {
          var coordsOnly = R.unnest(R.values(showData).map(el => {
            return R.ap([R.clone], R.repeat(el.coords, el.value ));
          }));
          
          var getNoise = () => (Math.random()-0.5)*0.7;
          coordsOnly = coordsOnly.map(arr => [arr[0] + getNoise(),arr[1] + getNoise()]);
          //var data = [[37.782551, -122.445368], [37.782745, -122.444586]],
          if(heatmap !== null){
            heatmap.destroy();
          }
          heatmap = new Heatmap(coordsOnly);
          heatmap.setMap(map);
          
          monthIndex = (monthIndex+1)%12;
          showData = dataByMonth[monthList[monthIndex]];
          addEl(clearEl(queryEl(".month-label")), makeText(monthList[monthIndex] + " 2017"));
        };
        
        setInterval(() => {
          ymaps.modules.require(['Heatmap'], showHeatmap);
        }, 1000)
        ymaps.modules.require(['Heatmap'], showHeatmap);
        

        
        
        /*
        var names = R.keys(data);
        
        var fullData = {};
        names.forEach(name => {
                  var myGeocoder = ymaps.geocode(name);
          //var myGeocoder = ymaps.geocode(R.keys(data));
          myGeocoder.then(
              function (res) {
                fullData[name] = {
                  coords:res.geoObjects.get(0).geometry.getCoordinates(),
                  value: data[name]
                }
                console.log(JSON.stringify(fullData));
                ;
                                  //alert('Координаты объекта :' + res.geoObjects.get(0).geometry.getCoordinates());
              },
              function (err) {
                  alert('Ошибка');
              }
          );
        })*/
        
      });

    };
    
    var state = {};

})(this['app']={});