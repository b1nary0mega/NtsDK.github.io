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
				
				'briefings-save-file':"Документ сформирован. Сохраняем?",
				"briefings-error-on-generating-briefings" :  "Ошибка во время генерации файла: {0}",
				"briefings-error-on-template-uploading": "Ошибка при загрузке файла",
				'briefings-template-is-loaded' : 'Шаблон загружен',
				'briefings-custom-docx-template-is-missing' : 'Шаблон не загружен',
				'briefings-json-parse-error': 'Ошибка при разборе JSON',
				'briefings-template-error': 'Ошибка в шаблоне: {0}',
    };
    
    exports.get = (key)=>l10n[key];

})(this['l10n']={});