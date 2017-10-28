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

'use strict';

((exports)=>{

    var l10n ={
        players1: 'Анна,Боря,Ваня,Галя,Дима',
        characters1:'Арагорн,Боромир,Водный страж,Галадриэль,Денетор',
        profile1:'Функция,Любовь,Замес',
        players2: 'Aнтон,Боря,Ваня,Гоша,Дима',
        characters2:'Аня,Белла,Валя,Галя,Даша',
        profile2:'Умная,Красивая,Добрая',
        'profiles-not-ready': 'Профили не подготовлены',
        'some-values-missing' : 'Некоторые значения отсутствуют',
        'player-and char-list-length-not-equal' : 'Количество персонажей не совпадает с количеством игроков',
        'some-values-are-not-unique' : 'Какие-то значения не уникальны',
    };

    exports.get = (key)=>l10n[key];

})(this['l10n']={});
