module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "globals":{
        R: false,
        Utils: false,
        CommonUtils: false,
        UI: false,
        marriage: false,
        ymaps: false,
        L10n: false,
        dataByMonth: true,
        dragula: false,
        PNotify: false,
        Data: false,
        Constants: false,
        Errors: false,
        dateFormat: false,
        DBMS: false,
        jQuery: false,
        $: false,
        vex: false,
        
        
        l10n: false,
        constL10n: false,
        getEl: false,
        getEls: false,
        addClass: false,
        hasClass: false,
        addClasses: false,
        removeClass: false,
        toggleClass: false,
        setClassByCondition: false,
        queryEl: false,
        queryElEl: false,
        queryEls: false,
        addEl: false,
        addEls: false,
        makeEl: false,
        makeText: false,
        clearEl: false,
        setAttr: false,
        getAttr: false,
        setProps: false,
        setStyle: false,
        listen: false,
        strFormat: false,
    },
    "extends": "eslint:recommended",
//    "extends": "airbnb" ,
    "rules": {
        "no-console": "off",
        "no-unused-vars": "off",
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};