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

(function(callback){

	function charactersAPI(LocalDBMS, Errors) {
		// characters
		LocalDBMS.prototype.isCharacterNameUsed = function(characterName, callback) {
			"use strict";
			callback(null, this.database.Characters[characterName] !== undefined);
		};
		// characters
		LocalDBMS.prototype.createCharacter = function(characterName, callback) {
			"use strict";
			if(characterName === ""){
				callback(new Errors.ValidationError("characters-character-name-is-not-specified"));
				return;
			}
			
			if(this.database.Characters[characterName]){
				callback(new Errors.ValidationError("characters-character-name-already-used", [characterName]));
				return;
			}
			
			var newCharacter = {
				name : characterName
			};
	
			this.database.ProfileSettings.forEach(function(profileSettings) {
				if (profileSettings.type === "enum") {
					newCharacter[profileSettings.name] = profileSettings.value.split(",")[0];
				} else {
					newCharacter[profileSettings.name] = profileSettings.value;
				}
			});
			
	         for (var storyName in this.database.Stories) {
                var story = this.database.Stories[storyName];
                
                story.electors[characterName] = {
                        total: -1
                };
                Constants.timeMarks.forEach(function(timeMark){
                    story.electors[characterName][timeMark] = -1;
                });
                
            }
	
			this.database.Characters[characterName] = newCharacter;
			if(callback) callback();
		};
		// characters
		LocalDBMS.prototype.renameCharacter = function(fromName, toName, callback) {
			"use strict";
		    if (toName === "") {
		    	callback(new Errors.ValidationError("characters-new-character-name-is-not-specified"));
		        return;
		    }

		    if (fromName === toName) {
		    	callback(new Errors.ValidationError("characters-names-are-the-same"));
		        return;
		    }
		    
			if(this.database.Characters[toName]){
				callback(new Errors.ValidationError("characters-character-name-already-used", [toName]));
				return;
			}
			
			var data = this.database.Characters[fromName];
			data.name = toName;
			this.database.Characters[toName] = data;
			delete this.database.Characters[fromName];
	
			var storyName, story;
	
			var renameEventCharacter = function(event) {
				if (event.characters[fromName]) {
					data = event.characters[fromName];
					event.characters[toName] = data;
					delete event.characters[fromName];
				}
			};
	
			for (storyName in this.database.Stories) {
				story = this.database.Stories[storyName];
				if (story.characters[fromName]) {
					data = story.characters[fromName];
					data.name = toName;
					story.characters[toName] = data;
					delete story.characters[fromName];
	
					story.events.forEach(renameEventCharacter);
				}
				if(story.electors[fromName]){
				    var oldInfo = story.electors[fromName];
				    story.electors[toName] = oldInfo;
                    delete story.electors[fromName];
                }
			}
			if(callback) callback();
		};
	
		// characters
		LocalDBMS.prototype.removeCharacter = function(characterName, callback) {
			"use strict";
			delete this.database.Characters[characterName];
			var storyName, story;
	
			var cleanEvent = function(event) {
				if (event.characters[characterName]) {
					delete event.characters[characterName];
				}
			};
	
			for (storyName in this.database.Stories) {
				story = this.database.Stories[storyName];
				if (story.characters[characterName]) {
					delete story.characters[characterName];
					story.events.forEach(cleanEvent);
				}
				if(story.electors[characterName]){
				    delete story.electors[characterName];
				}
			}
			if(callback) callback();
		};
	
		// profile
		LocalDBMS.prototype.updateProfileField = function(characterName, fieldName, type, value, callback) {
			"use strict";
			var profileInfo = this.database.Characters[characterName];
			switch (type) {
			case "text":
			case "string":
			case "enum":
				profileInfo[fieldName] = value;
				break;
			case "number":
				if (isNaN(value)) {
				    callback(new Errors.ValidationError("characters-not-a-number"));
				    return;
				}
				profileInfo[fieldName] = Number(value);
				break;
			case "checkbox":
				profileInfo[fieldName] = value;
				break;
			}
			if(callback) callback();
		};
	};
	
	callback(charactersAPI);

})(function(api){
	typeof exports === 'undefined'? this['charactersAPI'] = api: module.exports = api;
});