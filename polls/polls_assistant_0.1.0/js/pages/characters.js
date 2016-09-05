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

/*global
 Utils, CharacterProfile, CharacterFilter, CharacterProfileConfigurer, DBMS
 */

"use strict";

var Characters = {};

Characters.init = function () {
    "use strict";
    var root = Characters;
    root.views = {};
    var nav = "charactersNavigation";
    var content = "charactersContent";
    var containers = {
		root: root,
		navigation: getEl(nav),
		content: getEl(content)
    };
    Utils.addView(containers, "character-profile", CharacterProfile,{mainPage:true});
    Utils.addView(containers, "character-profile-configurer", CharacterProfileConfigurer);

    listen(getEl("createCharacterButton"), "click", Characters.createCharacter);
    listen(getEl("renameCharacter"), "click", Characters.renameCharacter);
    listen(getEl("removeCharacterButton"), "click", Characters.removeCharacter);

    Characters.content = getEl("charactersDiv");
};

Characters.refresh = function () {
    "use strict";
    PermissionInformer.getCharacterNamesArray(true, Utils.processError(Characters.rebuildInterface));
};

Characters.rebuildInterface = function (names) {
    "use strict";
    
    var data = getSelect2Data(names);
    
    clearEl(getEl("fromName"));
    $("#fromName").select2(data);
    
    clearEl(getEl("characterRemoveSelector"));
    $("#characterRemoveSelector").select2(data);

    Characters.currentView.refresh();
};

Characters.createCharacter = function () {
    "use strict";
    var characterNameInput = getEl("characterNameInput");
    var name = characterNameInput.value.trim();

    if (name === "") {
        Utils.alert(getL10n("characters-character-name-is-not-specified"));
        return;
    }
    
    DBMS.isCharacterNameUsed(name, function(err, isCharacterNameUsed){
    	if(err) {Utils.handleError(err); return;}
        if (isCharacterNameUsed) {
            Utils.alert(strFormat(getL10n("characters-character-name-already-used"), [name]));
        } else {
            DBMS.createCharacter(name, function(err){
            	if(err) {Utils.handleError(err); return;}
            	PermissionInformer.refresh(function(err){
                	if(err) {Utils.handleError(err); return;}
                	if(Characters.currentView.updateSettings){
                		Characters.currentView.updateSettings(name);
                	}
                	Characters.refresh();
                });
            });
        }
    });
};

Characters.renameCharacter = function () {
    "use strict";
    var fromName = getEl("fromName").value.trim();
    var toName = getEl("toName").value.trim();

    if (toName === "") {
        Utils.alert(getL10n("characters-new-character-name-is-not-specified"));
        return;
    }

    if (fromName === toName) {
        Utils.alert(getL10n("characters-names-are-the-same"));
        return;
    }

    DBMS.isCharacterNameUsed(toName, function(err, isCharacterNameUsed){
    	if(err) {Utils.handleError(err); return;}
        if (isCharacterNameUsed) {
            Utils.alert(strFormat(getL10n("characters-character-name-already-used"), [toName]));
        } else {
            DBMS.renameCharacter(fromName, toName, function(err){
            	if(err) {Utils.handleError(err); return;}
            	PermissionInformer.refresh(function(err){
                	if(err) {Utils.handleError(err); return;}
                	if(Characters.currentView.updateSettings){
                		Characters.currentView.updateSettings(toName);
                	}
                	Characters.refresh();
                });
            });
        }
    });
};

Characters.removeCharacter = function () {
    "use strict";
    var name = getEl("characterRemoveSelector").value.trim();

    if (Utils.confirm(strFormat(getL10n("characters-are-you-sure-about-character-removing"),[name]))) {
        DBMS.removeCharacter(name, function(err){
        	if(err) {Utils.handleError(err); return;}
        	PermissionInformer.refresh(function(err){
            	if(err) {Utils.handleError(err); return;}
            	Characters.refresh();
            });
        });
    }
};
