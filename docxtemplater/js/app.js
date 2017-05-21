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
    state.templates = {};
    state.customDocxTemplate = null;
    
    exports.init = () => {
        UI.initPanelTogglers();
        queryEl('#dataArea').value = JSON.stringify(basicJSON, null, '  ');
        queryEl('#templateArea').value = basicTemplate;
        queryEl('#outputArea').value = '';
        listen(queryEl('#previewTextOutput'), 'click', previewTextOutput);  
        listen(queryEl("#convertToDocxTemplate"), "click", convertToDocxTemplate);
        listen(queryEl("#generateByDocxTemplate"), "click", generateByDocxTemplate);
        
        listen(getEl("makeCustomTextBriefings"), "click", function(){
            makeTextBriefings("txt", generateSingleTxt(getEl("templateArea").value));
        });
        
        listen(getEl("docxBriefings"), "change", readTemplateFile);
        listen(getEl("docxBriefings"), "focus", (e)=>{ 
            e.target.value = '';
            state.customDocxTemplate = null;
        });
        
        listen(getEl("makeDocxBriefings"), "click", () => {
            if(state.customDocxTemplate === null){
                Utils.alert(l10n.get("briefings-custom-docx-template-is-missing"));
            } else {
                var data = queryEl('#dataArea').value;
                try {
                    var data = JSON.parse(data);
                }  catch(err){
                    Utils.alert(l10n.get('briefings-json-parse-error'));
                    return;
                }
                exportDocxByTemplate(state.customDocxTemplate, data);
            }
        });
    };
    
    var makeTextBriefings = function (fileType, delegate) {
        var data = queryEl('#dataArea').value;
        try {
            var data = JSON.parse(data);
        }  catch(err){
            Utils.alert(l10n.get('briefings-json-parse-error'));
            return;
        }
      
        generateBriefings(data, fileType, function(data1){
            var result = delegate(data1);
            return new Blob([ result ], {
                type : "text/plain;charset=utf-8"
            });
        }, delegate);
    };
    
    var convertToDocxTemplate = function () {
        var docxTemplate = makeDocxTemplate("blob");
        Utils.confirm(l10n.get("briefings-save-file"), () => {
            saveAs(docxTemplate, "template.docx");
        });
    };
    
    var generateByDocxTemplate = function () {
        var data = queryEl('#dataArea').value;
        try {
            var data = JSON.parse(data);
        }  catch(err){
            Utils.alert(l10n.get('briefings-json-parse-error'));
            return;
        }
        exportDocxByTemplate(makeDocxTemplate("Uint8Array"), data);
    };
    
    var exportDocxByTemplate = function(template, data){
        generateBriefings(data, "docx", generateSingleDocx("blob", template), generateSingleDocx("Uint8Array", template));
    };
    
    var generateBriefings = function (briefingData, fileType, oneFileDelegate, separateFileDelegate) {
        //var toSeparateFiles = getEl("toSeparateFileCheckbox").checked;
        
        var fileName = "output";
    
        var out, archive;
        //updateStatus(getL10n("briefings-save-preparing"));
        try{
            /*if (toSeparateFiles) {
                var zip = new JSZip();
                var content = zip.generate();
                updateStatus(getL10n("briefings-start-saving"));
        
                var res = makeArchiveData(briefingData, separateFileDelegate);
                for ( var key in res) {
                    zip.file(key + "." + fileType, res[key]);
                }
                
                updateStatus(getL10n("briefings-archiving"));
                archive = zip.generate({type : "blob"});
                updateStatus(getL10n("briefings-archive-is-ready"));
                saveFile("briefings-save-archive", archive, fileName + ".zip");
            } else {*/
                //updateStatus(getL10n("briefings-start-saving"));
                out = oneFileDelegate(briefingData);
                //updateStatus(getL10n("briefings-file-is-ready"));
                saveFile("briefings-save-file", out, fileName + "." + fileType);
            //}
        } catch (err){
						var cl = R.clone(err);
						cl.stack = "See console";
            Utils.alert(strFormat(l10n.get("briefings-error-on-generating-briefings"), [JSON.stringify(cl)]));
            console.log(err);
        }
    };
    
    var saveFile = function(msgKey, out, fileName){
        Utils.confirm(l10n.get(msgKey), () => {
            saveAs(out, fileName);
        });
    };
    
    var generateSingleDocx = R.curry(function (type, template, data) {
        //var doc = new window.Docxgen(template);
				var doc = new Docxtemplater().loadZip(new JSZip(template));
        doc.setData(data);
        doc.render() // apply them (replace all occurences of {first_name} by
        // Hipp, ...)
        var out = doc.getZip().generate({
            type : type
        });
        return out;
    });
    
    var generateSingleTxt = R.curry(function (template, data) {
        try{
            return Mustache.render(template, data);
        } catch(err){
            Utils.alert(strFormat(getL10n('briefings-template-error'), [err.message]));
            throw err;
        }
    });
    
    var makeDocxTemplate = function (type) {
        var template = getEl('templateArea').value;
        
        var replaceBrackets = R.pipe(R.replace(/{{{/g, '{'),R.replace(/}}}/g, '}'),R.replace(/{{/g, '{'),R.replace(/}}/g, '}'));
        template = replaceBrackets(template).split('\n').map(function(string){
            return {string:string}
        });
        
        if(!state.templates['genericTemplate']){
            state.templates['genericTemplate'] = atob(templatesArr['genericTemplate']);
        }
        
        //var doc = new window.Docxgen(state.templates['genericTemplate']);
				var doc=new Docxtemplater().loadZip(new JSZip(state.templates['genericTemplate']));
        doc.setData({
            splittedText: template
        });
        doc.render();
        return doc.getZip().generate({
            type : type
        });
    };
    
    var previewTextOutput = () => {
        var data = queryEl('#dataArea').value;
        var template = queryEl('#templateArea').value;
        try {
            var data = JSON.parse(data);
        }  catch(err){
            Utils.alert(l10n.get('briefings-json-parse-error'));
            return;
        }
        try{
            var result = Mustache.render(template, data);
        } catch(err){
            Utils.alert(strFormat(l10n.get('briefings-template-error'), [err.message]));
            return;
        }
        queryEl('#outputArea').value = result;
    };
    
    var readTemplateFile = function (evt) {
        // Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];
    
        if (f) {
            var r = new FileReader();
            r.onload = function (e) {
                state.customDocxTemplate = e.target.result;
                Utils.alert(l10n.get("briefings-template-is-loaded"));
            }
            r.readAsBinaryString(f);
        } else {
            Utils.alert(l10n.get("briefings-error-on-template-uploading"));
        }
    };
    
})(this['app']={});