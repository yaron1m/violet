import * as _ from "lodash";
import {IOrder, Status} from "..";

export function existsAndNotEmpty(order: IOrder, key: string) {
    // @ts-ignore
    return _.has(order, key) && order[key] && isNonEmptyArray(order[key]);
}

function isNonEmptyArray(arr: any[]) {
    return _.isArray(arr) ? arr.length !== 0 : true;
}

export function isMatchingStatus(order: IOrder, status: Status | Status[]) {
    if (_.isArray(status))
        return _.includes(status, order.status);

    return order.status === status;
}