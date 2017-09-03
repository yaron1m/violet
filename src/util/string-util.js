export function getValueOrEmptyString(obj, key){
    if(!obj.hasOwnProperty(key) || obj[key] === null || obj[key] === undefined)
        return "";

    return obj[key];
}