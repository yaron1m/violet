import * as _ from "lodash";
import {isEmptyValue} from "../../../util/string-util";

function arrayMerge(objValue, srcValue) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

export function mergerRequiredFields(base, newFields = {}) {
    return _.mergeWith(_.cloneDeep(base), newFields, arrayMerge);
}

export function hasMissingFields(object, required) {
    const nonEmptyKeys = _.filter(_.keys(object), key => object[key] !== "");
    return !_.isEmpty(_.difference(required, nonEmptyKeys));
}

export function isRightTabKey(selectedOrder, tabKey, isDefaultTab = false){
    if(isEmptyValue(selectedOrder, "lectureDetailsTabKey"))
        return isDefaultTab;

    return selectedOrder.lectureDetailsTabKey === tabKey;
}