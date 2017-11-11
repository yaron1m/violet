export function getValueOrEmptyString(obj, key){
    if(isEmptyValue(obj, key))
        return "";

    return obj[key];
}

export function isEmptyValue(obj, key){
    return obj=== undefined || !obj.hasOwnProperty(key) || obj[key] === null || obj[key] === undefined || obj[key]==="";
}

export function cutIfLong(str, maxLength){
    if(str === undefined)
        return undefined;

    if(str.length <= maxLength)
        return str;

    return str.substr(0, maxLength) + "...";
}