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
    
    var l10n ={
        "open-database":"Load database from file",
        "save-database":"Save database to file",
        "create-database":"Create new database",
        "new-base-warning": "Are you sure about creating new database? All unsaved changes in current database will be lost.",
        "before" : "Before '{0}'",
        "to-end" : "To end",
        'slider-name-cant-be-empty':"Slider name can't be empty.",
        'remove-slider-confirmation': 'Are you sure about removing slider "{0}"?',
        'remove-link-confirmation': 'Are you sure about removing link "{0}"?',
    };
    
    exports.get = (key)=>l10n[key];

})(this['l10n']={});