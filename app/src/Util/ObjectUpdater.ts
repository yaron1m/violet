import * as SeamlessImmutable from 'seamless-immutable';
import Immutable from 'seamless-immutable';

export function changeImmutable<T>(obj :SeamlessImmutable.Immutable<T>, key:string, value:any) {
    return mergeImmutable(obj, {
        [key]: value
    });
}

export function toMutable<T>(obj: SeamlessImmutable.Immutable<T>): T {
    // @ts-ignore
    return obj.asMutable({deep: true});
}


export function createImmutable<T>(obj: T) {
    return Immutable(obj);
}


export function mergeImmutable<T>(oldState: SeamlessImmutable.Immutable<T>, newState: object)
    : SeamlessImmutable.Immutable<T> {
    // @ts-ignore
    return Immutable.merge(oldState, newState);
}

export function updateObject<T>(oldObject:T, newObject = {}) : T{
    return Object.assign({}, oldObject, newObject);
}