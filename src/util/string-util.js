import _ from 'lodash'

export function getValueOrEmptyString(obj, key) {
    if (isEmptyValue(obj, key))
        return "";

    return obj[key];
}

export function isEmptyValue(obj, key) {
    return obj === undefined || !obj.hasOwnProperty(key) || isEmpty(obj[key]);
}

function isEmpty(val) {
    return val === null || val === undefined || val === "";
}

export function cutIfLong(str, maxLength) {
    if (str === undefined)
        return undefined;

    if (str.length <= maxLength)
        return str;

    return str.substr(0, maxLength) + "...";
}

export function moneyFormat(str, currencyIcon){
    if(isEmpty(str))
        return str;

    return _.parseInt(str).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " " + currencyIcon
}