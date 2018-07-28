import Immutable from "seamless-immutable";

export function changeImmutable(obj, key, value) {
    return Immutable.merge(obj, {
        [key]: value
    });
}

export function toMutable(obj) {
    return Immutable.asMutable(obj, { deep: true });
}


export function createImmutable(obj) {
    return Immutable(obj);
}


export function mergeImmutable(oldState, newState) {
    return Immutable.merge(oldState, newState);
}

export function updateObject(oldObject, newObject){
    return Object.assign({}, oldObject, newObject);
}