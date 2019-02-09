import _ from 'lodash';

export function getValueOrEmptyString(obj: object, key: string) {
    if (isEmptyValue(obj, key))
        return "";

    // @ts-ignore
    return obj[key] as string;
}

export function isEmptyValue(obj: object, key: string) {
    // @ts-ignore
    return isEmpty(obj) || !obj.hasOwnProperty(key) || isEmpty(obj[key]);
}

export function isEmpty(val: any) {
    return !val || val === "";
}

export function cutIfLong(str: string, maxLength: number) {
    if (isEmpty(str))
        return str;

    const addition = "...";

    if (str.length <= maxLength)
        return str;

    return str.substr(0, maxLength - addition.length) + addition;
}

export function moneyFormat(str: string, currencyIcon: string) {
    if (isEmpty(str) || isNaN(parseInt(str)))
        return str;

    return _.toNumber(str).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " " + currencyIcon;
}