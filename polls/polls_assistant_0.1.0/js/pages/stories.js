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
 Utils, DBMS, StoryEvents, StoryCharacters, EventPresence
 */

"use strict";

var Stories = {};

Stories.init = function () {
    "use strict";
    Stories.left = {views:{}};
    Stories.right = {views:{}};
    var containers = {
        root: Stories.left,
        navigation: getEl("storiesNavigationLeft"),
        content: getEl("storiesContentLeft")
    };
    Utils.addView(containers, "master-story", MasterStory, {mainPage:true, toggle:true});
    Utils.addView(containers, "electors", Electors, {toggle:true});
//    Utils.addView(containers, "story-events", StoryEvents, {toggle:true});
//    Utils.addView(containers, "story-characters", StoryCharacters, {toggle:true});
//    Utils.addView(containers, "event-presence", EventPresence, {toggle:true});
    containers = {
        root: Stories.right,
        navigation: getEl("storiesNavigationRight"),
        content: getEl("storiesContentRight")
    };
    Utils.addView(containers, "master-story", MasterStory, {toggle:true});
    Utils.addView(containers, "electors", Electors, {mainPage:true, toggle:true});
//    Utils.addView(containers, "story-events", StoryEvents, {mainPage:true, toggle:true});
//    Utils.addView(containers, "story-characters", StoryCharacters, {toggle:true});
//    Utils.addView(containers, "event-presence", EventPresence, {toggle:true});

    listen(getEl('createStoryButton'), "click", Stories.createStory);
    listen(getEl('renameStoryButton'), "click", Stories.renameStory);
    listen(getEl('removeStoryButton'), "click", Stories.removeStory);
    
    $("#storySelector").select2().on("change", Stories.onStorySelectorChangeDelegate);

    Stories.content = getEl("storiesDiv");
};

Stories.chainRefresh = function(){
    "use strict";
    if((Stories.left.currentView && Stories.left.currentView.name === "EventPresence") || 
       (Stories.right.currentView && Stories.right.currentView.name === "EventPresence")){
        EventPresence.refresh();
    }
};

Stories.refresh = function () {
    "use strict";
    var selectors = ["fromStory", "storyRemoveSelector"];
    
    var storySelector = clearEl(getEl("storySelector"));
    selectors.forEach(R.compose(clearEl, getEl));
    
    PermissionInformer.getStoryNamesArray(false, function(err, allStoryNames){
    	if(err) {Utils.handleError(err); return;}
    	PermissionInformer.getStoryNamesArray(true, function(err, userStoryNames){
    		if(err) {Utils.handleError(err); return;}
    		if(userStoryNames.length > 0){
    		    var data = getSelect2Data(userStoryNames);
    		    selectors.forEach(function(selector){
    		        $("#" + selector).select2(data);
    		    });
    		}
    		
	        if (allStoryNames.length > 0) {
	            var storyName = Stories.getSelectedStoryName(allStoryNames);
	            
	            var data = getSelect2Data(allStoryNames);
	            $("#storySelector").select2(data).val(storyName).trigger('change');
	            
	            Stories.onStorySelectorChange(storyName);
	        } else {
	            Stories.onStorySelectorChange();
	        }
	        
	        if(Stories.left.currentView)Stories.left.currentView.refresh();
	        if(Stories.right.currentView)Stories.right.currentView.refresh();
    	});
    });
    
};

Stories.getSelectedStoryName = function(storyNames){
    "use strict";
    var settings = DBMS.getSettings();
    if(!settings["Stories"]){
        settings["Stories"] = {
            storyName : storyNames[0].value
        };
    }
    var storyName = settings["Stories"].storyName;
    if(storyNames.map(function(nameInfo){return nameInfo.value;}).indexOf(storyName) === -1){
        settings["Stories"].storyName = storyNames[0].value;
        storyName = storyNames[0].value;
    }
    return storyName;
};

Stories.createStory = function () {
    "use strict";
    var storyName = getEl("createStoryName").value.trim();
    if (storyName === "") {
        Utils.alert(getL10n("stories-story-name-is-not-specified"));
        return;
    }
    
    DBMS.isStoryExist(storyName, function(err, isExist){
    	if(err) {Utils.handleError(err); return;}
        if(isExist){
            Utils.alert(strFormat(getL10n("stories-story-name-already-used"), [storyName]));
        } else {
            DBMS.createStory(storyName, function(err){
            	if(err) {Utils.handleError(err); return;}
                Stories.updateSettings(storyName);
                PermissionInformer.refresh(function(err){
                	if(err) {Utils.handleError(err); return;}
                	Stories.refresh();
                });
            });
        }
    });
};

Stories.renameStory = function () {
    "use strict";
    var fromName = getEl("fromStory").value.trim();
    var toName = getEl("toStory").value.trim();

    if (toName === "") {
        Utils.alert(getL10n("stories-new-story-name-is-not-specified"));
        return;
    }

    if (fromName === toName) {
        Utils.alert(getL10n("stories-names-are-the-same"));
        return;
    }
    
    DBMS.isStoryExist(toName, function(err, isExist){
    	if(err) {Utils.handleError(err); return;}
        if(isExist){
            Utils.alert(strFormat(getL10n("stories-story-name-already-used"), [toName]));
        } else {
            DBMS.renameStory(fromName, toName, function(err){
            	if(err) {Utils.handleError(err); return;}
                Stories.updateSettings(toName);
                PermissionInformer.refresh(function(err){
                	if(err) {Utils.handleError(err); return;}
                	Stories.refresh();
                });
            });
        }
    });
};

Stories.removeStory = function () {
    "use strict";
    var name = getEl("storyRemoveSelector").value.trim();

    if (Utils.confirm(strFormat(getL10n("stories-are-you-sure-about-story-removing"), [name]))) {
        DBMS.removeStory(name, function(err){
        	if(err) {Utils.handleError(err); return;}
        	PermissionInformer.refresh(function(err){
            	if(err) {Utils.handleError(err); return;}
            	Stories.refresh();
            });
        });
    }
};

Stories.onStorySelectorChangeDelegate = function (event) {
    "use strict";
    var storyName = event.target.value;
    Stories.onStorySelectorChange(storyName);
};

Stories.onStorySelectorChange = function (storyName) {
    "use strict";
    Stories.CurrentStoryName = storyName;
    
    if(storyName){
        Stories.updateSettings(storyName);
        PermissionInformer.isStoryEditable(storyName, function(err, isStoryEditable){
            if (err) {Utils.handleError(err);return;}
            if(Stories.left.currentView)Stories.left.currentView.refresh();
            if(Stories.right.currentView)Stories.right.currentView.refresh();
            Utils.enable(Stories.content, "isStoryEditable", isStoryEditable);
        });
    } else { // when there are no stories at all
        Stories.updateSettings(null);
        if(Stories.left.currentView)Stories.left.currentView.refresh();
        if(Stories.right.currentView)Stories.right.currentView.refresh();
    }
};

Stories.updateSettings = function (storyName) {
    "use strict";
    var settings = DBMS.getSettings();
    settings["Stories"].storyName = storyName;
};
