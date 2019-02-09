import {IState} from '../../Interfaces/ReduxInterfaces';
import {toMutable} from '../../util/ObjectUpdater';
import IOrder from '../../Interfaces/IOrder';
import {TabKey} from '../../util/Constants/Status';

export function getSelectedOrder(state: IState) {
    return toMutable(state.selectedOrder).order;
}

export function isSelectedOrder(state: IState) {
    return state.selectedOrder.isSelectedOrder;
}

export function isPublicCourseOrder(order: IOrder) {
    return order.lectureDetailsTabKey === TabKey.publicCourseTabKey;
}