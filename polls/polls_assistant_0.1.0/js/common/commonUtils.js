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

(function(exports) {
	
	exports.startsWith = function(str1, str2){
		return str1.substring(0, str2.length) === str2;
	};

	exports.removeFromArrayByIndex = function(array, from, to) {
		"use strict";
		var rest = array.slice((to || from) + 1 || array.length);
		array.length = from < 0 ? array.length + from : from;
		return array.push.apply(array, rest);
	};
	
    exports.charOrdAFactory = function(prepare, mul){
        "use strict";
        return function(a, b) {
            mul = mul || 1;
            a = prepare(a);
            b = prepare(b);
            if (a > b)
                return 1 * mul;
            if (a < b)
                return -1 * mul;
            return 0;
        };
    };

    exports.charOrdA = exports.charOrdAFactory(function(a){return a.toLowerCase();});
    
    exports.eventsByTime = exports.charOrdAFactory(function(a){return new Date(a.time);});

    exports.strFormat = function(str, vals){
        "use strict";
        return str.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
            if (m == "{{") { return "{"; }
            if (m == "}}") { return "}"; }
            return vals[n];
        });
    };
    
    exports.consoleLog = function(str){
        "use strict";
        console.log(str);
    };
    
	exports.clone = function(o) {
		"use strict";
		if (!o || 'object' !== typeof o) {
			return o;
		}
		var c = 'function' === typeof o.pop ? [] : {};
		var p, v;
		for (p in o) {
			if (o.hasOwnProperty(p)) {
				v = o[p];
				if (v && 'object' === typeof v) {
					c[p] = exports.clone(v);
				} else {
					c[p] = v;
				}
			}
		}
		return c;
	};
})(typeof exports === 'undefined' ? this['CommonUtils'] = {} : exports);