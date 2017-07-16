/*Copyright 2015 Timofey Rechkalov <ntsdk@yandex.ru>, Maria Sidekhmenova <matilda_@list.ru>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
   limitations under the License. */

/*global
 Utils, saveAs, FileReader, Blob
 */

"use strict";

var FileUtils = {};

FileUtils.init = function (callback) {
    FileUtils.callback = callback;
};

FileUtils.makeNewBase = function () {
    
    Utils.confirm(l10n.get("utils-new-base-warning"), () => {
        app.newModel();
//        DBMS.setDatabase(CommonUtils.clone(EmptyBase.data), FileUtils.callback);
    });
};

FileUtils.readSingleFile = function (evt) {
    // Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            var database = JSON.parse(contents);
            app.setModel(database);
//            DBMS.setDatabase(database, FileUtils.callback);
        };
        r.readAsText(f);
    } else {
        Utils.alert(getL10n("utils-base-file-loading-error"));
    }
};

FileUtils.saveFile = function () {
    FileUtils.json2File(app.getModel(), "mixing-desk.json");
};

FileUtils.json2File = function (str, fileName) {
    FileUtils.str2File(JSON.stringify(str, null, '  '), fileName);
};

FileUtils.str2File = function (str, fileName) {
    var blob = new Blob([ str ], {
        type : "text/plain;charset=utf-8"
    });
    saveAs(blob, fileName);
};

