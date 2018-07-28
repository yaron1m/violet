import * as _ from "lodash";

export function existsAndNotEmpty(order, key) {
    return _.has(order, key) && order[key] && isNonEmptyArray(order[key]);
}

function isNonEmptyArray(arr){
    return _.isArray(arr) ? arr.length !== 0 : true;
}

export function isMatchingStatus(order, status) {
    if (_.isArray(status))
        return _.includes(status, order.status);

    return order.status === status;
}