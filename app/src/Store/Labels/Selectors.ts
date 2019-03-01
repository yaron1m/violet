import {getSelectedOrder} from "../SelectedOrder/Selectors";
import * as _ from "lodash";
import {getStatusLabels, progressiveStatuses, Status} from "../../Util/Constants/Status";
import {IState} from "../../Interfaces/ReduxInterfaces";
import IOrder from "../../Interfaces/IOrder";

export function getLabels(state: IState) {
    return state.labels;
}

export function getSelectedOrderStatusLabel(state: IState) {
    const selectedOrder = getSelectedOrder(state);
    return getOrderStatusLabel(state, selectedOrder);
}

function getStatusLabels1(state: IState) {
    return getLabels(state).orderStatus;
}

export function getStatusLabel(status: Status) {
    return getStatusLabels()[status];
}

export function getOrderStatusLabel(state: IState, order: IOrder) {
    const labels = getStatusLabels1(state);
    if (_.isEmpty(order))
        return labels[progressiveStatuses.contact];

    let status = labels[order.status];
    if (order.followUpRequired)
        status += labels.followUp;
    return status;
}