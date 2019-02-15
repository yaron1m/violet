export function toMutable<T>(obj: T): T {
    return obj;
}

export function createImmutable<T>(obj: T) {
    return updateObject(obj);
}

export function mergeImmutable<T>(oldState: T, newState: object): T {
    return updateObject(oldState, newState);
}

export function updateObject<T>(oldObject: T, newObject = {}): T {
    return Object.assign({}, oldObject, newObject);
}