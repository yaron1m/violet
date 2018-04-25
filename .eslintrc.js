module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jest/recommended"
    ],
    "rules": {
        "linebreak-style": 0
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "jest": true
    }
};