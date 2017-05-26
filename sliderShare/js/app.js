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
    var emptyModel = {
      name:"",
      description:"",
      links:[],
      sliders:[]
    };
    var model;
    var sliders = [];
    
    var btnOpts = {
        tooltip : true,
        className : 'mainNavButton'
    };
    
//    var updateHash = () => {window.location.hash = encodeURIComponent(JSON.stringify(model));}
    var updateHash = () => {window.location.hash = btoa(unescape(encodeURIComponent(JSON.stringify(model))));}
    var setModelProp = (name, value) => {setProp(model, name, value); updateHash();};
    var arr2Select = R.map(R.compose(R.zipObj(['name']), R.prop('name')));
    exports.getModel = () => model;
    exports.newModel = () => exports.setModel(emptyModel);
    exports.setModel = (newModel) => {
        model = newModel;
        queryEl('#name-input').value = model.name;
        queryEl('#description-input').value = model.description;
        refreshLinks();
        refreshSliders();
        updateHash();
    };
    
    exports.init = () => {
        UI.initPanelTogglers();
        var hash = window.location.hash.substr(1);
//        Utils.alert(decodeURIComponent(hash));
        var decoded = decodeURIComponent(escape(atob(hash)));
        console.log(decoded);
        
        var localModel;
        try{
            localModel = JSON.parse(decoded);
        } catch(e){
            console.log(e);
            localModel = R.clone(emptyModel);
            updateHash();
        }
        exports.setModel(localModel);
        
        
        listen(queryEl('#name-input'), 'input', (event) => setModelProp('name',event.target.value));
        listen(queryEl('#description-input'), 'input', (event) => setModelProp('description',event.target.value));
        
        listen(queryEl('.common-info-panel .create-link-button'), 'click', createLink);
        listen(queryEl('.common-info-panel .remove-link-button'), 'click', removeLink);
        
        listen(queryEl('.mixer-settings-panel .create-slider-button'), 'click', createSlider);
        listen(queryEl('.mixer-settings-panel .move-slider-button'  ), 'click', moveSlider);
        listen(queryEl('.mixer-settings-panel .remove-slider-button'), 'click', removeSlider);
        
        initButtons();
    };
    
    var initButtons = () => {
        var navigation = queryEl('#navigation');
        var button = makeButton("dataLoadButton", "open-database", null, btnOpts);
        button.addEventListener('change', FileUtils.readSingleFile, false);
        
        var input = makeEl("input");
        input.type = "file";
        addClass(input, 'hidden');
        setAttr(input, 'tabindex', -1);
        button.appendChild(input);
        button.addEventListener('click', function(e){
            input.click();
//                    e.preventDefault(); // prevent navigation to "#"
        });
        addEl(navigation, button);
        
        addEl(navigation, makeButton("dataSaveButton", "save-database", FileUtils.saveFile, btnOpts));
        addEl(navigation, makeButton("newBaseButton", "create-database", FileUtils.makeNewBase, btnOpts));
    };
    
    var makeButton = function(id, name, callback, opts){
        var button = makeEl("button");
        button.id = id;
        if(opts.tooltip){
            var delegate = function(){
                $(button).attr('data-original-title', l10n.get(name));
            };
//            L10n.onL10nChange(delegate);
            $(button).tooltip({
                title : l10n.get(name),
                placement : "bottom"
            });
        }
        addClass(button, "action-button");
        if(opts.className){
            addClass(button, opts.className);
        }
        if(callback){
            listen(button, 'click', callback);
        }
        return button;
    };
    
    var makeSliderBackbone = (sl, i) => {
        var input = setAttr(makeEl('input'), 'pos', i);
        var container = addClasses(makeEl('div'), ['col-x12123s-2', 'slider-container']);
        var header = addEl(addClass(makeEl('div'), 'slider-header'), makeText(sl.name));
        var top = addClass(addEl(makeEl('div'), makeText(sl.top)), 'slider-sublabel');
        var body = addClass(addEl(makeEl('div'),input), 'slider-body') ;
        var bottom = addClass(addEl(makeEl('div'),makeText(sl.bottom)), 'slider-sublabel');
        return addEls(container, [header, top, body, bottom]);
    }; 
    
    var refreshSliders = () => {
        var positions = model.sliders.map( info => {return {name: strFormat(l10n.get('before'), [info.name])}});
        positions.push({name: l10n.get('to-end')});
        fillSelector(clearEl(queryEl('.mixer-settings-panel .move-slider-select')), model.sliders);
        fillSelector(clearEl(queryEl('.mixer-settings-panel .move-slider-pos-select')), positions);
        fillSelector(clearEl(queryEl('.mixer-settings-panel .remove-slider-select')), model.sliders);
        
        addEls(clearEl(queryEl('.mixer-panel .panel-body')), model.sliders.map( makeSliderBackbone )) ;
        
        clearEls(sliders);
        
        sliders = model.sliders.map( (sl, i) => new Slider('.mixer-panel .panel-body input[pos="' + i + '"]', {
            max: 10,
            min: -10,
            orientation: 'vertical',
            reversed: true,
            tooltip: 'always',
            value: sl.value,
            formatter: function(value) {
                return Math.abs(value);
            },
        }).on('change', (event) => {sl.value = event.newValue; updateHash();}));
    };
    
    var createSlider = function(){
        var name = queryEl('#slider-name-input').value.trim();
        if(name === ''){
            Utils.alert(l10n.get('slider-name-cant-be-empty'));
            return;
        }
        var top = queryEl('#slider-top-input').value.trim();
        var bottom = queryEl('#slider-bottom-input').value.trim();
        
        queryEl('#slider-name-input').value = queryEl('#slider-top-input').value = queryEl('#slider-bottom-input').value = '';
        
        model.sliders.push({
            name: name, top: top, bottom: bottom, value: 0
        });
        
        updateHash();
        refreshSliders();
    };
    
    var moveSlider = function(){
        var index = queryEl('.mixer-settings-panel .move-slider-select').selectedIndex;
        var pos = queryEl('.mixer-settings-panel .move-slider-pos-select').selectedIndex;
        
        if(pos > index){
            pos--;
        }
        var tmp = model.sliders[index];
        model.sliders.splice(index, 1);
        model.sliders.splice(pos, 0, tmp);
        
        updateHash();
        refreshSliders();
    };
    
    var removeSlider = function() {
        var index = queryEl('.mixer-settings-panel .remove-slider-select').selectedIndex;
        if (index < model.sliders.length) {
            Utils.confirm(strFormat(l10n.get('remove-slider-confirmation'), [model.sliders[index].name]), () => {
                model.sliders.splice(index, 1);
                updateHash();
                refreshSliders();
            });
        }
    };
    
    var createLinkEl = (link) => addEl(makeEl('div'), addEl(setAttr(makeEl('a'), 'href', link.body), makeText(link.name)));
    
    var refreshLinks = () => {
      fillSelector(clearEl(queryEl('.common-info-panel .remove-link-select')), model.links);
      addEls(clearEl(queryEl('.common-info-panel .links-container')), model.links.map(createLinkEl));
    };
    var createLink = () => {
      var name = queryEl('#link-name-input').value.trim();
      var body = queryEl('#link-body-input').value.trim();
      if(name === '' && body === '') return;
      queryEl('#link-body-input').value = queryEl('#link-name-input').value = '';
      model.links.push({name: name, body: body});
      updateHash();
      refreshLinks();
    };
    var removeLink = () => {
      var index = queryEl('.common-info-panel .remove-link-select').selectedIndex;
      if(index < model.links.length){
        Utils.confirm(strFormat(l10n.get('remove-link-confirmation'), [model.links[index].name]), () => {
          model.links.splice(index, 1);
          updateHash();
          refreshLinks();  
        });
      }
    };
    

})(this['app']={});