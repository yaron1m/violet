import {getSelectedOrder} from "../SelectedOrder/Selectors";
import * as _ from "lodash";
import {progressiveStatuses} from "../../util/Constants/Status";

export function getSelectedOrderStatus(state) {
    const selectedOrder = getSelectedOrder(state);
    return getOrderStatusLabel(state, selectedOrder);

}

export function getLabels(state) {
    return state.labels
}

export function getStatusLabels(state) {
    return getLabels(state).pages.orderPage.orderStatus
}

export function getStatusLabel(state, status) {
    return getStatusLabels(state)[status];
}

export function getOrderStatusLabel(state, order) {
    const labels = getStatusLabels(state);
    if (_.isEmpty(order))
        return labels[progressiveStatuses.contact];

    let status = labels[order.status];
    if (order.followUpRequired)
        status += labels.followUp;
    return status;
}