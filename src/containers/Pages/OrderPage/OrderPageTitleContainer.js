import {connect} from 'react-redux';
import OrderPageTitle from "./OrderPageTitle";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrder} from "../../../store/selected/reducer";
import {getSelectedOrderStatus} from "../../../util/order-status";

function getPageTitle(state){
    return isSelectedOrder(state) ?
        getLabels(state).pages.orderPage.title.orderNumberTitle + getSelectedOrder(state).id
        : getLabels(state).pages.orderPage.title.newOrderTitle;
}

function mapStateToProps(state) {
    return {
        title: getPageTitle(state),
        status: getSelectedOrderStatus(state),
    };
}

export default connect(mapStateToProps)(OrderPageTitle);
