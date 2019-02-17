import {getSelectedOrder} from "../SelectedOrder/Selectors";
import * as _ from "lodash";
import {progressiveStatuses, Status} from "../../Util/Constants/Status";
import {IState} from "../../Interfaces/ReduxInterfaces";
import IOrder from "../../Interfaces/IOrder";

export function getLabels(state: IState) {
    return state.labels;
}

export function getSelectedOrderStatusLabel(state: IState) {
    const selectedOrder = getSelectedOrder(state);
    return getOrderStatusLabel(state, selectedOrder);
}

export function getStatusLabels(state: IState) {
    return getLabels(state).orderStatus;
}

export function getStatusLabel(state: IState, status: Status) {
    return getStatusLabels(state)[status];
}

export function getOrderStatusLabel(state: IState, order: IOrder) {
    const labels = getStatusLabels(state);
    if (_.isEmpty(order))
        return labels[progressiveStatuses.contact];

    let status = labels[order.status];
    if (order.followUpRequired)
        status += labels.followUp;
    return status;
}

export function getOrderPageLabels(state: IState) {
    return getLabels(state).pages.orderPage;
}

export function getOrderSectionsLabels(state: IState) {
    return getOrderPageLabels(state).sections;
}