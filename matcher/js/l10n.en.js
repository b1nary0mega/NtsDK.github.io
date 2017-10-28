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
        players1: 'Ann,Bob,Caroline,Daphne,Judas',
        characters1:'Aragorn,Boromir,Water Guardian,Galadriel,Denetor',
        profile1:'Function,Love,Action',
        players2: '1,2,3,4,5,6,7,8,9',
        characters2:'A,B,C,D,E,F,G,H,I',
        profile2:'Val1,Val2,Val3',
        'profiles-not-ready': 'Profiles are not prepared',
        'some-values-missing' : 'Some values missing',
        'player-and char-list-length-not-equal' : 'Character number is not equal to player number',
        'some-values-are-not-unique' : 'Some values are not unique',
    };

    exports.get = (key)=>l10n[key];

})(this['l10n']={});
