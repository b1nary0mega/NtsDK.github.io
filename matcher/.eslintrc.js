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
        
        
        l10n: false,
        queryEl: false,
        queryEls: false,
        addEl: false,
        addEls: false,
        makeEl: false,
        makeText: false,
        clearEl: false,
        setAttr: false,
        getAttr: false,
        setStyle: false,
        listen: false,
        strFormat: false,
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": "off",
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