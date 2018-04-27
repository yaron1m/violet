module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jest/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "jest": true
    },
    "globals": {
        "process": false
    },
    "rules": {
        "linebreak-style": 0,
        "no-alert": 2,
        "no-global-assign": 2,
        "no-implicit-coercion": 2,
        "eqeqeq": 2,
        "no-multi-spaces": 2,
        "no-self-compare": 2,
        "no-useless-concat": 2,
        "no-var": 2,
        "prefer-const": 2
    }
};