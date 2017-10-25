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
    
    var state = {};
    
    exports.init = () => {
      
        var grayencode = (g) => g ^ (g >> 1);
      
        var zoom = 5;
        var x1,y1,x0,y0;
        x1=y1=x0=y0=0;
        var i, num, mul;
        var max = 2<<13;
        var points = [[x0,y0]];
        for(i=1;i<max;i++){
        //num = i;
            num = grayencode(i);
        
            x1=y1=0;
            mul = 1;
            while(num>0){
                x1 += num%2*mul;
                num >>= 1;
                y1 += num%2*mul;
                num >>= 1;
                mul <<= 1;
            }
            //canvas.add(makeLine(R.ap([R.multiply(zoom)], [ x0, y0, x1, y1 ]), 'red'));
            points.push([x1, y1]);
            //canvas.add(makeLine(R.ap([R.multiply(zoom)], [ y0, x0, y1, x1 ]), 'green'));
            //canvas.add(makeLine(R.ap([R.multiply(zoom)], [ y0, 15 - x0, y1, 15 - x1 ]), 'green'));
            //canvas.add(makeLine(R.ap([R.multiply(zoom)], [ 15 - y0, x0, 15 - y1, x1 ]), 'blue'));
            //canvas.add(makeLine(R.ap([R.multiply(zoom)], [ 15 - y0, 15 - x0, 15 - y1, 15 - x1 ]), 'brown'));
            x0 = x1;
            y0 = y1;
        //console.log(grayencode(i));
        //console.log(x1 + " " + y1);
        }
        //<div class="fractal-space"></div>
        var seed = [0,0];
        var transformation = [[0,0],[1,0],[0,1],[1,1]];
        //var transformation = [[0.5,0],[1,0.5],[0.5,1],[0,0.5]];
        //var transformation = [[0,0],[0.5,0.5],[1,0],[0.5,0.5],[0,1],[0.5,0.5],[1,1]];
        //var transformation = [[0,0],[0,1],[1,1],[1,0]];
        //var depth = 8;
        var depth = 7;
        var compressionIndex = 2;
        var compressionValue = 1;
        var res = [seed];
        while(depth > 0){
            res = R.unnest(res.map(el => transformation.map(el2 => R.zip(el, el2.map(el3 => el3/compressionValue)).map(R.sum))));
            //console.log(res);
            depth--;
            compressionValue *= compressionIndex;
        }
        zoom = 500;
        //updateSvg(zoom, points);
        updateSvg(zoom, res);

    };
    
    var updateSvg = (zoom, points) => {
        var svgNS = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        var rect = document.createElementNS(svgNS,'rect');
        rect.setAttribute('x',5);
        rect.setAttribute('y',5);
        rect.setAttribute('width',500);
        rect.setAttribute('height',500);
        rect.setAttribute('fill','#95B3D7');
        //svg.appendChild(rect);
      
        var poly = document.createElementNS(svgNS,'polyline');
        setAttr(poly, 'stroke', 'red');
        setAttr(poly, 'stroke-width', '1px');
        setAttr(poly, 'fill', 'none');
        //setAttr(poly, 'points', points.map(el => el.map(R.multiply(zoom)).join(',')).join(' '));
        setAttr(poly, 'points', points.map(el => el.map(R.multiply(zoom)).join(',')).join(' '));
        //setAttr(poly, 'points', "10,40 100,40 40,60 140,60 120,45 120,75 140,60");
        svg.appendChild(poly);
      
        var max = R.multiply(zoom,Math.max.apply(null, R.flatten(points)));
      
        //setAttr(svg, 'width', max + 'px');
        //setAttr(svg, 'height', max + 'px');
        setAttr(svg, 'style', 'width:' + max + 'px;'+'height:' + max + 'px');
      
        //stroke="red" stroke-width="3px" fill="none"
        //points=" 10,40 100,40 40,60 140,60 120,45 120,75 140,60"
    
        addEl(clearEl(queryEl('.fractal-space')), svg);
    };
    
})(this['app']={});