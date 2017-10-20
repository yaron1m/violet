import * as _ from "lodash";

function arrayMerge(objValue, srcValue) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

export function mergerRequiredFields(base, newFields = {}) {
    return _.mergeWith(_.cloneDeep(base), newFields, arrayMerge);
}

