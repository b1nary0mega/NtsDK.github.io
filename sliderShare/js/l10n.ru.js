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
            "save-database": 'Сохранить базу на диск',
            "open-database": 'Загрузить базу из файла',
            "create-database": 'Создать новую базу',
            "utils-new-base-warning": 'Вы уверены, что хотите создать новую базу? Все несохраненные изменения будут потеряны.',
            'before':'Перед "{0}"',
            'to-end': 'В конец',
            'slider-name-cant-be-empty':"Название бегунка не может быть пустым.",
            'remove-slider-confirmation': 'Вы уверены, что хотите удалить бегунок "{0}"?',
            'remove-link-confirmation': 'Вы уверены, что хотите удалить ссылку "{0}"?',
    };
    
    exports.get = (key)=>l10n[key];

})(this['l10n']={});