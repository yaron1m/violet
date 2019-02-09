import {connect} from 'react-redux';
import OrderPageTitle from "./OrderPageTitle";
import {getOrderPageLabels} from "../../Store/Labels/Selectors";
import {isSelectedOrder} from "../../Store/SelectedOrder/Selectors";
import {getSelectedOrderStatusLabel} from "../../Store/Labels/Selectors";
import {getSelectedOrder} from "../../Store/SelectedOrder/Selectors";

function getPageTitle(state){
    return isSelectedOrder(state) ?
        getOrderPageLabels(state).title.orderNumberTitle + getSelectedOrder(state).id
        : getOrderPageLabels(state).title.newOrderTitle;
}

function mapStateToProps(state) {
    return {
        title: getPageTitle(state),
        status: getSelectedOrderStatusLabel(state),
    };
}

export default connect(mapStateToProps)(OrderPageTitle);
