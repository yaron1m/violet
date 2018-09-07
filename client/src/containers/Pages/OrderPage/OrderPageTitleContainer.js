import {connect} from 'react-redux';
import OrderPageTitle from "./OrderPageTitle";
import {getLabels} from "../../../store/Labels/Selectors";
import {isSelectedOrder} from "../../../store/SelectedOrder/Selectors";
import {getSelectedOrderStatus} from "../../../store/Labels/Selectors";
import {getSelectedOrder} from "../../../store/SelectedOrder/Selectors";

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
