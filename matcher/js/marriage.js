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

    exports.match = function(proposerPriority, selectorPriority, log){
        var size = R.keys(proposerPriority).length;
        var proposers = R.mapObjIndexed((val, proposer)=> {
            return {
                checkList : val.map(R.prop('id')),
                next : 0,
                id : proposer
            };
        }, proposerPriority);
        var selectors = R.mapObjIndexed((val, selector)=> {
            return {
                checkList : val.map(R.prop('id')),
                prop : [],
                select : null,
                id : selector
            };
        }, selectorPriority);
        //        var proposers = R.keys(proposerPriority).map(proposer => {return { checkList: proposerPriority[proposer].map(R.prop('id')), next: 0, id: proposer};} );
        //        var selectors = R.keys(selectorPriority).map(selector => {return { checkList: selectorPriority[selector].map(R.prop('id')), prop: [], select: null, id: selector};} );
        //        var selectors = selectorPriority.map((prio, id) => {return { checkList: prio, prop: [], select: null, id: id};} );
        //        var proposers = proposerPriority.map((prio, id) => {return { checkList: prio, next: 0, id: id};} );
        //        var selectors = selectorPriority.map((prio, id) => {return { checkList: prio, prop: [], select: null, id: id};} );
        
        if(log)console.log('proposers ' + JSON.stringify(proposers));
        if(log)console.log('selectors ' + JSON.stringify(selectors));
        if(log)console.log('');
        
        while (true) {
            var acceptedProposers = R.values(selectors).map(R.prop('select')).filter(R.compose(R.not, R.isNil));
            if(log)console.log('acceptedProposers ' + JSON.stringify(acceptedProposers));
            if(log)console.log('');
            
            var rejectedProposers = R.keys(proposers).filter((proposer) => acceptedProposers.indexOf(proposer) === -1).filter(proposer => proposers[proposer].next < size);
            if(log)console.log('rejectedProposers ' + JSON.stringify(rejectedProposers));
            if(log)console.log('');
            if(rejectedProposers.length == 0){
                break;
            }
            
            rejectedProposers.forEach((proposer) =>{
                var tmp = proposers[proposer];
                selectors[tmp.checkList[tmp.next]].prop.push(tmp.id);
                tmp.next++;
            });
            if(log)console.log('proposers choice');
            if(log)console.log('proposers ' + JSON.stringify(proposers));
            if(log)console.log('selectors ' + JSON.stringify(selectors));
            if(log)console.log('');
            
            //woman make select
            R.values(selectors).filter(selector => selector.prop.length > 0).forEach(function(selector) {
                var best = selector.prop.reduce(function(best, proposerId) {
                    return best === null || best.score > selector.checkList.indexOf(proposerId) ? {proposerId: proposerId,score: selector.checkList.indexOf(proposerId)} : best;
                }, null);
                if(selector.select === null || best.score < selector.checkList.indexOf(selector.select)){
                    selector.select = best.proposerId;
                }
                selector.prop = [];
            });
            
            if(log)console.log('selectors select');
            if(log)console.log('selectors ' + JSON.stringify(selectors));
            if(log)console.log('');
        }
        
        R.values(selectors).forEach(selector => proposers[selector.select].select = selector.id);
        if(log)console.log('proposers ' + JSON.stringify(proposers));
        if(log)console.log('selectors ' + JSON.stringify(selectors));
        return {
            proposers: proposers,
            selectors: selectors
        };
    };
})(this['marriage']={});