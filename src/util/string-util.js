export function getValueOrEmptyString(obj, key){
    if(isEmptyValue(obj, key))
        return "";

    return obj[key];
}

export function isEmptyValue(obj, key){
    return !obj.hasOwnProperty(key) || obj[key] === null || obj[key] === undefined || obj[key]==="";
}