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
  
//    var state = {};
//    var emptyModel = {
//      name:"",
//      description:"",
//      links:[],
//      sliders:[]
//    };
//    var model;
//    var sliders = [];
//    
//    var btnOpts = {
//        tooltip : true,
//        className : 'mainNavButton'
//    };
//    
////    var updateHash = () => {window.location.hash = encodeURIComponent(JSON.stringify(model));}
//    var updateHash = () => {window.location.hash = btoa(unescape(encodeURIComponent(JSON.stringify(model))));}
//    var setModelProp = (name, value) => {setProp(model, name, value); updateHash();};
//    var arr2Select = R.map(R.compose(R.zipObj(['name']), R.prop('name')));
//    exports.getModel = () => model;
//    exports.newModel = () => exports.setModel(emptyModel);
//    exports.setModel = (newModel) => {
//        model = newModel;
//        queryEl('#name-input').value = model.name;
//        queryEl('#description-input').value = model.description;
//        refreshLinks();
//        refreshSliders();
//        updateHash();
//    };
    
    exports.init = () => {
        UI.initPanelTogglers();
        
        moment.locale('ru');
//        var tle = '0 LEMUR-2 JEROEN\n1 40934U 15052E   15306.10048119  .00001740  00000-0  15647-3 0  9990\n2 40934   6.0033 141.2190 0010344 133.6141 226.4604 14.76056230  5130';
//        var jspredict = require('jspredict');
//        console.log(jspredict.observe(tle, null));
        
//        var hash = window.location.hash.substr(1);
////        Utils.alert(decodeURIComponent(hash));
//        var decoded = decodeURIComponent(escape(atob(hash)));
//        console.log(decoded);
//        
//        var localModel;
//        try{
//            localModel = JSON.parse(decoded);
//        } catch(e){
//            console.log(e);
//            localModel = R.clone(emptyModel);
//            updateHash();
//        }
//        exports.setModel(localModel);
//        
//        
        listen(queryEl('.calc-button'), 'click', calcTransits);
        listen(queryEl('.ask-coords-from-browser'), 'click', askCoordsFromBrowser);
//        listen(queryEl('.save-coords'), 'click', saveCoords);
        listen(queryEl('.enable-coord-select'), 'click', enableCoordSelect);
//        listen(queryEl('#description-input'), 'input', (event) => setModelProp('description',event.target.value));
//        
//        listen(queryEl('.common-info-panel .create-link-button'), 'click', createLink);
//        listen(queryEl('.common-info-panel .remove-link-button'), 'click', removeLink);
//        
//        listen(queryEl('.mixer-settings-panel .create-slider-button'), 'click', createSlider);
//        listen(queryEl('.mixer-settings-panel .move-slider-button'  ), 'click', moveSlider);
//        listen(queryEl('.mixer-settings-panel .remove-slider-button'), 'click', removeSlider);
//        
//        initButtons();
    };
    
//    navigator.geolocation.getCurrentPosition(showPosition); // Запрашиваем местоположение, и в случае успеха вызываем функцию showPosition
//    function showPosition(position) {
//      /* Выводим координаты */
//      document.write("Широта: " + position.coords.latitude + "<br />");
//      document.write("Долгота: " + position.coords.longitude);
//    }
    var askCoordsFromBrowser = () => {
        navigator.geolocation.getCurrentPosition((position)=> {
            queryEl('.latitude').value = position.coords.latitude;
            queryEl('.longitude').value = position.coords.longitude;
        });
    }

    
    var calcTransits = () => {
        var tle = queryEl('.tle-text').value;
        var latitude = (Number(queryEl('.latitude').value));
        var longitude = (Number(queryEl('.longitude').value));
        var altitude = Number(queryEl('.altitude').value);
        var minElevation = Number(queryEl('.minElevation').value);
        
//        console.log(jspredict.observe(tle, null));
        var qth = [latitude, longitude, altitude/1000];
        var res = jspredict.transits(tle, qth,  moment().valueOf(), moment().add(1, 'days').valueOf()).filter(data => data.maxElevation > minElevation);
        console.log(res);
        
        var body = clearEl(queryEl('.calc-results .panel-body'));
        
        addEl(body, addEls(makeEl('div'), [
            makeSubEl('Текущее время', moment()),
            makeSubEl('Текущее время UTC', moment().utc()),
            makeSubEl('Найдено транзитов', res.length),
            makeEl('br')
        ]));
        addEls(body, res.map(makeSingleTransitDiv));
    };
    
    var makeSingleTransitDiv = (data, i) => {
        return addEls(makeEl('div'), [
            makeSubEl('Номер', i+1),
            makeSubEl('Начало', moment(data.start)),
            makeSubEl('Конец', moment(data.end)),
            makeSubEl('Длительность', moment.duration(data.duration).humanize()),
            makeSubEl('Min. азимут', data.minAzimuth),
            makeSubEl('Max. азимут', data.maxAzimuth),
            makeSubEl('Apex. азимут', data.apexAzimuth),
            makeSubEl('Max. подъем', data.maxElevation),
            makeEl('br')
        ])
    };
    
    var makeSubEl = (name, value) => {
        return addEls(makeEl('div'), [
           addEl(makeEl('label'), makeText(name)),
           addEl(makeEl('span'), makeText(value))
        ]);
    };
    
//    var saveCoords = () => {
//        var iframe = queryEl('iframe');
//        queryEl('.latitude').value = iframe.contentWindow.document.querySelector('#ctl00_cph1_txtLat').value;
//        queryEl('.longitude').value = iframe.contentWindow.document.querySelector('#ctl00_cph1_txtLong').value;
////        queryEl('.latitude').value = position.coords.latitude;
////        queryEl('.longitude').value = position.coords.longitude;
//    };
    
    var enableCoordSelect = () => {
        var iframe = makeEl('iframe');
        setAttr(iframe, 'src', "http://www.heavens-above.com/SelectLocation.aspx");
        setAttr(iframe, 'style', "width: 100%;height: 100vh;");
        addEl(clearEl(queryEl('.iframe-container')), iframe);
    };
    
})(this['app']={});