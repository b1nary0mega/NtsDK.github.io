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
    const fillData = id => (() => {
        queryEl('#playersInput').value = l10n.get(`players${id}`);
        queryEl('#charactersInput').value = l10n.get(`characters${id}`);
        queryEl('#profileInput').value = l10n.get(`profile${id}`);
    });

    exports.init = () => {
        UI.initPanelTogglers();
        listen(queryEl('.rpg-data'), 'click', fillData(1));
        listen(queryEl('.marriage-data'), 'click', fillData(2));
        fillData(1)();

        listen(queryEl('.create-data-forms'), 'click', createDataForms);
        listen(queryEl('.random-checks'), 'click', randomChecks);
        listen(queryEl('.calc-priorities'), 'click', calcPriorities);
        listen(queryEl('.match-button'), 'click', match);
    };

    const state = {};

    const match = () => {
        if (state.players === undefined) {
            Utils.alert(l10n.get('profiles-not-ready'));
            return;
        }

        let numberInputs = shuffle(queryEls('.player-priority-panel input[type=number]'));
        const playerPriorities = R.zipObj(
            state.players,
            R.ap([R.clone], R.repeat([], state.players.length))
        );
        numberInputs.forEach((el) => {
            const key = JSON.parse(getAttr(el, 'key'));
            playerPriorities[key.subject].push({ id: key.itemId, index: Number(el.value) });
        });
        numberInputs = shuffle(queryEls('.character-priority-panel input[type=number]'));
        const charPriorities = R.zipObj(
            state.chars,
            R.ap([R.clone], R.repeat([], state.chars.length))
        );
        numberInputs.forEach((el) => {
            const key = JSON.parse(getAttr(el, 'key'));
            charPriorities[key.subject].push({ id: key.itemId, index: Number(el.value) });
        });
        R.values(playerPriorities).forEach(arr => arr.sort(CommonUtils.charOrdAFactory(R.prop('index'))));
        R.values(charPriorities).forEach(arr => arr.sort(CommonUtils.charOrdAFactory(R.prop('index'))));
        console.log(playerPriorities);
        console.log(charPriorities);

        //        readPriorities

        let res = marriage.match(playerPriorities, charPriorities, true);
        makeResultTable(queryEl('.player-result-panel tbody'), playerPriorities, charPriorities, res);
        res = marriage.match(charPriorities, playerPriorities, true);
        makeResultTable(queryEl('.character-result-panel tbody'), charPriorities, playerPriorities, res);
    };

    const getColor = (value, total) => {
        if (total === 0) { return 'transparent'; }
        function calc(b, a, part) {
            return ((a * part) + ((1 - part) * b)).toFixed(0);
        }

        let p = value / total;
        if (p < 0.5) {
            p *= 2;
            return strFormat('rgba({0},{1},{2}, 1)', [calc(251, 255, p), calc(126, 255, p), calc(129, 0, p)]); // red to yellow mapping
        }
        p = (p - 0.5) * 2;
        return strFormat('rgba({0},{1},{2}, 1)', [calc(255, 123, p), calc(255, 225, p), calc(0, 65, p)]); // yellow to green mapping
    };

    const makeResultTable = (tbody, proposerPriorities, selectorPriorities, result) => {
        const size = state.players.length - 1;
        const res = R.values(result.proposers).map(R.pick(['id', 'select']));
        res.sort(CommonUtils.charOrdAFactory(R.prop('id')));

        addEls(clearEl(tbody), res.map((el) => {
            const proposerHappiness = proposerPriorities[el.id].map(R.prop('id')).indexOf(el.select);
            const selectorHappiness = selectorPriorities[el.select].map(R.prop('id')).indexOf(el.id);

            const proposer = addEl(makeEl('td'), makeText(el.id));
            const selector = addEl(makeEl('td'), makeText(el.select));
            // var proposer = addEl(makeEl('td'), makeText(el.id+' ' + proposerHappiness/size));
            // var selector = addEl(makeEl('td'), makeText(el.select+' ' + selectorHappiness/size));
            setStyle(proposer, 'backgroundColor', getColor(size - proposerHappiness, size));
            setStyle(selector, 'backgroundColor', getColor(size - selectorHappiness, size));

            return addEls(makeEl('tr'), [proposer, selector]);
        }));
    };

    const compareProfiles = (prof1, prof2) => R.sum(R.keys(prof1)
        .map(name => (prof1[name] === prof2[name] ? 0 : 10)));

    const calcPriorities = () => {
        if (state.players === undefined) {
            Utils.alert(l10n.get('profiles-not-ready'));
            return;
        }

        let checkboxes = queryEls('.player-profile-panel input[type=checkbox]');
        const playerProfiles = R.zipObj(
            state.players,
            R.ap([R.clone], R.repeat({}, state.players.length))
        );
        checkboxes.forEach((el) => {
            const key = JSON.parse(getAttr(el, 'key'));
            playerProfiles[key.subject][key.profileItem] = el.checked;
        });
        checkboxes = queryEls('.character-profile-panel input[type=checkbox]');
        const charProfiles = R.zipObj(
            state.chars,
            R.ap([R.clone], R.repeat({}, state.chars.length))
        );
        checkboxes.forEach((el) => {
            const key = JSON.parse(getAttr(el, 'key'));
            charProfiles[key.subject][key.profileItem] = el.checked;
        });
        console.log(playerProfiles);
        console.log(charProfiles);

        const indexCmp = CommonUtils.charOrdAFactory(R.prop('index'));
        const profile2data = R.curry((profile, profiles, profileName) => ({
            id: profileName,
            index: compareProfiles(profile, profiles[profileName]),
        }));
        //        console.log(playerPriorities);
        const profile2priority = R.curry((profiles, profile) => R.keys(profiles)
            .map(profile2data(profile, profiles)).sort(indexCmp));
        const playerPriorities = R.mapObjIndexed(profile2priority(charProfiles), playerProfiles);
        const charPriorities = R.mapObjIndexed(profile2priority(playerProfiles), charProfiles);
        //        console.log(charPriorities);

        //        state.playerPriorities = playerPriorities;
        //        state.charPriorities = charPriorities;

        makePriorityTable(queryEl('.player-priority-panel thead'), queryEl('.player-priority-panel tbody'), playerPriorities);
        makePriorityTable(queryEl('.character-priority-panel thead'), queryEl('.character-priority-panel tbody'), charPriorities);
    };

    const makePriorityTable = (thead, tbody, priorities) => {
        addEl(clearEl(thead), addEls(makeEl('tr'), [''].concat(R.range(0, state.players.length)).map(name => addEl(makeEl('th'), makeText(name)))));

        addEls(clearEl(tbody), R.keys(priorities).sort().map((subject) => {
            const label = addEl(makeEl('th'), makeText(subject));
            const items = priorities[subject].map((item) => {
                const label2 = addEl(makeEl('div'), makeText(item.id));
                const input = setAttr(makeEl('input'), 'type', 'number');
                input.value = item.index;
                input.style.width = '40px';
                addEl(label2, input);
                setAttr(input, 'key', JSON.stringify({ subject, itemId: item.id }));
                return addEl(makeEl('td'), label2);
                //                return addEl(makeEl('td'), makeText(item.id + ':' + item.index));
            });

            return addEls(makeEl('tr'), [label].concat(items));
            //            return addEls(makeEl('tr'), [label]);
        }));
    };

    const createDataForms = () => {
        let players = queryEl('#playersInput').value.trim();
        let chars = queryEl('#charactersInput').value.trim();
        let profile = queryEl('#profileInput').value.trim();
        if (players === '' || chars === '' || profile === '') {
            Utils.alert(l10n.get('some-values-missing'));
            return;
        }
        players = players.split(',');
        chars = chars.split(',');
        profile = profile.split(',');
        if (players.length !== chars.length) {
            Utils.alert(l10n.get('player-and char-list-length-not-equal'));
            return;
        }
        if (R.uniq(players).length !== players.length || R.uniq(chars).length !== chars.length ||
                R.uniq(profile).length !== profile.length) {
            Utils.alert(l10n.get('some-values-are-not-unique'));
            return;
        }
        state.players = players.sort();
        state.chars = chars.sort();
        state.profile = profile.sort();

        createTable(queryEl('.player-profile-panel thead'), queryEl('.player-profile-panel tbody'), state.profile, state.players);
        createTable(queryEl('.character-profile-panel thead'), queryEl('.character-profile-panel tbody'), state.profile, state.chars);
    };

    let createTable = (thead, tbody, profile, subjects) => {
        addEl(clearEl(thead), addEls(makeEl('tr'), [''].concat(profile).map(name => addEl(makeEl('th'), makeText(name)))));

        addEls(clearEl(tbody), subjects.map((subject) => {
            const label = addEl(makeEl('th'), makeText(subject));
            const items = profile.map((profileItem) => {
                const input = setAttr(makeEl('input'), 'type', 'checkbox');
                setAttr(input, 'key', JSON.stringify({ subject, profileItem }));
                return addEl(makeEl('td'), input);
            });

            return addEls(makeEl('tr'), [label].concat(items));
        }));
    };

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        const arr2 = R.clone(array);
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = arr2[currentIndex];
            arr2[currentIndex] = arr2[randomIndex];
            arr2[randomIndex] = temporaryValue;
        }

        return arr2;
    }

    // eslint-disable-next-line no-param-reassign
    const randomCheck = el => (el.checked = Math.random() >= 0.5);
    let randomChecks = () => queryEls('input[type=checkbox]').forEach(randomCheck);
})(this.app = {});
