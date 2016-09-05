/*Copyright 2016 Timofey Rechkalov <ntsdk@yandex.ru>

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

(function(exports){

	exports.data = {
	    "Meta": {
	        "name" : "",
	        "date" : "",
	        "preGameDate" : "",
	        "description" : ""
	    },
	    "Characters": {},
	    "ProfileSettings": [
            {
              "name": "Расположение участка",
              "type": "string",
              "value": ""
            },
            {
              "name": "Ответственный",
              "type": "string",
              "value": ""
            }
          ],
	    "Stories": {},
	    "Settings" : {
	        "BriefingPreview" : {
	        },
	        "Stories" : {
	        },
	        "CharacterProfile" : {
	        }
	    },
	    "Version": "0.4.1"
	};

})(typeof exports === 'undefined'? this['EmptyBase']={}: exports);