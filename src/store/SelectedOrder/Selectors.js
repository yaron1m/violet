import {publicCourseTabKey} from "../../util/Constants/TabKeys";

export function getSelectedOrder(state) {
    return state.selectedOrder.order;
}

export function isSelectedOrder(state) {
    return state.selectedOrder.isSelectedOrder;
}

export function isPublicCourseOrder(order){
    return order.lectureDetailsTabKey === publicCourseTabKey;
}