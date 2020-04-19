import {IState} from "../../Interfaces/ReduxInterfaces";
import {toMutable} from "../../Util/ObjectUpdater";
import {IOrder, TabKey} from "@violet/common";

export function getSelectedOrder(state: IState) {
    return toMutable(state.selectedOrder).order;
}

export function isSelectedOrder(state: IState) {
    return state.selectedOrder.isSelectedOrder;
}

export function isPublicCourseOrder(order: IOrder) {
    return order.lectureDetailsTabKey === TabKey.publicCourseTabKey;
}