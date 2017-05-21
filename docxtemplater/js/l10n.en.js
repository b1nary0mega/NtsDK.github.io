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
				'briefings-save-file':"Document is ready. Save?",
				"briefings-error-on-generating-briefings" :  "Error during generating file: {0}",
				"briefings-error-on-template-uploading": "Error on template uploading",
				'briefings-template-is-loaded' : 'Template is loaded',
				'briefings-custom-docx-template-is-missing' : 'Template is missing',
				'briefings-json-parse-error': 'JSON parse error',
				'briefings-template-error': 'Template error: {0}',
    };
    
    exports.get = (key)=>l10n[key];

})(this['l10n']={});