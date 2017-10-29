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

((exports) => {
    const state = {};

    const checkboxList = [
        'show-country',
        'show-continent',
        'show-seed-capital-mark',
        'show-capital-marks',
        'show-shortest-paths'
    ];

    exports.init = () => {
        //        queryEl('body').innerHTML = JSON.stringify(Data.capitals);
        ymaps.ready(() => {
            dragula([queryEl('.capitalsList')]);
            listen(queryEl('.start-game'), 'click', startGame);
            listen(queryEl('.start-game-2'), 'click', startGame);
            listen(queryEl('.end-game'), 'click', endGame);
            UI.initPanelTogglers();
            state.map = new ymaps.Map('map', {
                //            center: [55.76, 37.64],
                center: [0, 0],
                zoom: 2
            }, {
                //            projection: ymaps.projection.Cartesian,
                //            projection: ymaps.projection.sphericalMercator,
                //            restrictMapArea: true,
                minZoom: 1
            });
            state.map.behaviors.enable('scrollZoom');
        });

        checkboxList.forEach(el => (queryEl(`.${el}`).checked = true));
        //      checkboxList.forEach(el => listen(queryEl('.' + el),'change', startGame));
        checkboxList.forEach(el => listen(queryEl(`.${el}`), 'change', notify));
        //      listen(queryEl('.capital-number'),'change', startGame);
        listen(queryEl('.capital-number'), 'change', notify);
        listen(queryEl('.min-capital-dist'), 'change', notify);
        listen(queryEl('.full-capital-list'), 'change', notify);
        queryEl('.full-capital-list').checked = false;
        queryEl('.capital-number').value = 5;
        queryEl('.min-capital-dist').value = 300;
    };

    const notify = () => {
        PNotify.removeAll();
        // eslint-disable-next-line no-new
        new PNotify({
            text: 'Изменения настроек будут применены в следующей игре.',
            type: 'info',
            styling: 'bootstrap3',
            delay: 5000,
            icon: false
        });
    };
    const bubbleSort = (arr) => {
        let swaps = 0;
        let tmp;
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i].distance > arr[j].distance) {
                    tmp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = tmp;
                    swaps++;
                }
            }
        }
        return swaps;
    };

    const endGame = () => {
        const divs = queryEls('.capitalsList div');
        const capitalNames = divs.map(el => getAttr(el, 'name'));

        const caps = R.indexBy(R.prop('name'), state.capitals);

        divs.forEach((el) => {
            const name = getAttr(el, 'name');
            addEl(clearEl(queryElEl(el, '.dist')), makeText(` (${Math.round(caps[name].distance / 1000)} км)`));
        });

        const capsArr = capitalNames.map(el => caps[el]);
        const swaps = bubbleSort(capsArr);
        const max = (state.capitalNum * (state.capitalNum - 1)) / 2;
        const score = max - swaps;

        const advices = R.sum(checkboxList.map(el => (queryEl(`.${el}`).checked ? 1 : 0)));
        let str;
        switch (advices) {
        case 0: str = 'без подсказок!'; break;
        case 1: str = 'с одной подсказкой!'; break;
        case 2: str = `с ${advices} подсказками!`; break;
        case 3: case 4: case 5: str = `с ${advices} подсказками.`; break;
        default: str = '';
        }
        let congrat = '';
        if (score > max * 0.8) {
            congrat = 'Поздравляем! Вы можете нарисовать глобус по памяти!';
        } else if (score > max * 0.6) {
            congrat = 'Хороший результат! Вы не заблудитесь на глобусе.';
        } else {
            congrat = 'Нужно еще потренироваться';
        }
        Utils.alert({ unsafeMessage: strFormat('Ваш счет {0} из {1} {2}<br>{3}', [score, max, str, congrat]) });

        state.capitals.map(addShortestPath(true, state.seedCapital));
        addCapital(state.seedCapital, true);
        state.capitals.map(addCapital(R.__, false));
    };


    const startGame = () => {
        addClass(queryEl('.container-fluid .intro-panel .panel-body'), 'hidden');

        queryEls('.annotation').map(removeClass(R.__, 'hidden'));

        state.map.geoObjects.removeAll();
        state.capitalNum = Number(queryEl('.capital-number').value);

        let names = R.keys(Data.capitals);

        if (!queryEl('.full-capital-list').checked) {
            names = names.filter(name => !R.contains(Data.capitals[name].enCountry, Data.extraCountryList));
        }


        names = shuffle(names);
        state.seedCapital = R.clone(Data.capitals[names[0]]);
        let tries = 10000;
        let ok = false;
        //        var rest = R.tail(names);
        const minDist = Number(queryEl('.min-capital-dist').value) * 1000;
        while (tries > 0 && !ok) {
            names = shuffle(names);
            state.seedCapital = R.clone(Data.capitals[names[0]]);
            //            rest = shuffle(rest);
            state.capitals = R.clone(R.values(R.pick(R.slice(1, 1 + state.capitalNum, names), Data.capitals)));
            state.capitals.map(el =>
                (el.distance = getDistance(state.seedCapital.coords, el.coords)));
            const distances = state.capitals.map(R.prop('distance'));
            distances.sort();

            if (R.aperture(2, distances).every(el => (el[1] - el[0]) > minDist)) {
                ok = true;
                break;
            }
            tries--;
        }
        if (!ok) {
            Utils.alert('Не удалось подобрать подходящий набор столиц. Попробуйте уменьшить минимальное расстояние между столицами от главной.');
            return;
        }


        console.log(state.seedCapital);
        console.log(state.capitals);


        if (queryEl('.show-seed-capital-mark').checked) {
            addCapital(state.seedCapital, true);
        }

        if (queryEl('.show-capital-marks').checked) {
            state.capitals.map(addCapital(R.__, false));
        }

        addEl(clearEl(queryEl('.seedCapital')), makeCapitalLine(state.seedCapital));

        addEls(clearEl(queryEl('.capitalsList')), state.capitals.map(makeCapitalLine));

        if (queryEl('.show-shortest-paths').checked) {
            state.capitals.map(addShortestPath(false, state.seedCapital));
        }
    };

    const makeCapitalLine = (cap) => {
        const img = setAttr(makeEl('img'), 'src', `flags/${cap.alpha2.toLowerCase()}.svg`);
        addClass(img, 'flag');
        let text = cap.name;
        if (queryEl('.show-country').checked) {
            text += `, ${cap.country}`;
        }
        if (queryEl('.show-continent').checked) {
            text += `, ${cap.continent}`;
        }
        const div = setAttr(addClass(makeEl('div'), 'capitalLine'), 'name', cap.name);
        return addEls(div, [img, addEl(makeEl('span'), makeText(text)), addClass(makeEl('span'), 'dist')]);
    };

    const getDistance = R.curry((startPoint, endPoint) =>
        ymaps.coordSystem.geo.solveInverseProblem(startPoint, endPoint).distance);

    const addShortestPath = R.curry((showKm, cap1, cap2) => {
        let hint = `${cap1.name}-${cap2.name}`;
        if (showKm) {
            hint += ` (${Math.round(cap2.distance / 1000)} км)`;
        }

        const myGeoObject = new ymaps.GeoObject({
        // Описываем геометрию типа "Ломаная линия".
            geometry: {
                type: 'LineString',
                coordinates: [
                    cap1.coords, cap2.coords
                ]
            },
            // Описываем данные геообъекта.
            properties: {
                hintContent: hint
            }
        }, {
            // Включаем отображение в форме геодезических кривых.
            geodesic: true,
            // Задаем ширину в 5 пикселей.
            strokeWidth: 5,
            // Задаем цвет линии.
            strokeColor: '#F008'
        });
        // Добавляем геообъект на карту.
        state.map.geoObjects.add(myGeoObject);
    });

    const addCapital = R.curry((capital, isSeed) => {
        const myPlacemark = new ymaps.Placemark(capital.coords, {
            //            balloonContent: JSON.stringify(arr),
            iconContent: capital.name
        }, {
            preset: isSeed ? 'islands#greenStretchyIcon' : 'islands#blueStretchyIcon',
        });

        state.map.geoObjects.add(myPlacemark);
    });

    function shuffle(array) {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
})(this.app = {});
