import {getSelectedOrder} from "../SelectedOrder/Selectors";
import {getStatusLabels} from "./Reducer";
import * as _ from "lodash";
import {progressiveStatuses} from "../../util/Constants/Status";

export function getSelectedOrderStatus(state) {
    const selectedOrder = getSelectedOrder(state);
    return getOrderStatusLabel(state, selectedOrder);

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