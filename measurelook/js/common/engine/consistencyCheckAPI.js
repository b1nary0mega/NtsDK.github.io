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
    
    function consistencyCheckAPI(LocalDBMS, R, CommonUtils, validatorLib, schemaBuilder) {
        
        LocalDBMS.prototype.getConsistencyCheckResult = function(callback) {
            "use strict";
            
            var errors = [];
            var pushError = (str) => errors.push(str);
//            
//            checkCharacterProfileConsistency(this.database, pushError);
//            checkProfileValueConsistency(this.database, pushError);
//            checkStoryCharactersConsistency(this.database, pushError);
//            checkEventsCharactersConsistency(this.database, pushError);
//            if(this.database.ManagementInfo){
//                checkObjectRightsConsistency(this.database, pushError);
//            }
            
            checkMeasures(this.database, pushError);
            checkParams(this.database, pushError);
            
            var schema = schemaBuilder.getSchema(this.database);
            var validator = validatorLib({allErrors: true}); // options can be passed, e.g. {allErrors: true}
            var validate = validator.compile(schema);
            var valid = validate(this.database);
            if (!valid) {
                errors = errors.concat(validate.errors);
            }
            
            callback(null, errors);
        };
        
        var getErrorProcessor = function(callback){
            return R.curry(R.compose(callback, CommonUtils.strFormat));
        }
        
        var checkMeasures = function(data, callback){
            var processError = getErrorProcessor(callback);
            R.keys(data.measures).forEach((elt) => {
                if(data.measures[elt].measureKey !== elt){
                    processError("measureKey is inconsistent with measure id: measureKey {0}, measure id {1}", [data.measures[elt].measureKey, elt]);
                }
            });
        };
        
        var checkParams = function(data, callback){
            var processError = getErrorProcessor(callback);
            
            var names = R.flatten([data.constantParams.map(R.prop('name')), data.changedParams.map(R.prop('name')), data.measuredParams.map(R.prop('name'))]);
            
            if(R.uniq(names).length !== names.length){
                var diff = R.toPairs(R.groupBy((name) => name, names)).filter(pair => pair[1].length > 1).map(pair => pair[0]);
                processError("some param names are reused: difference {0}", [diff]);
            }
            
            if(R.difference(names,['measureKey','passId','raw']).length !== names.length){
                processError("measureKey, passId and raw are prohibited param names", []);
            }
        };
    };
    
    callback(consistencyCheckAPI);

})(function(api){
    typeof exports === 'undefined'? this['consistencyCheckAPI'] = api: module.exports = api;
});