import _ from 'lodash'

export function getValueOrEmptyString(obj, key) {
    if (isEmptyValue(obj, key))
        return "";

    return obj[key];
}

export function isEmptyValue(obj, key) {
    return isEmpty(obj) || !obj.hasOwnProperty(key) || isEmpty(obj[key]);
}

function isEmpty(val) {
    return !val || val === "";
}

export function cutIfLong(str, maxLength) {
    if (isEmpty(str))
        return undefined;

    const addition = "...";

    if (str.length <= maxLength)
        return str;

    return str.substr(0, maxLength - addition.length) + addition;
}

export function moneyFormat(str, currencyIcon) {
    if (isEmpty(str) || isNaN(str))
        return str;

    return _.toNumber(str).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " " + currencyIcon
}

export function getRegexMatches(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}