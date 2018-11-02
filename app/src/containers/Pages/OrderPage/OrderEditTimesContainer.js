import {connect} from 'react-redux';
import {getOrderPageLabels} from "../../../store/Labels/Selectors";
import {isSelectedOrder} from "../../../store/SelectedOrder/Selectors";
import OrderTimes from "./OrderEditTimes";
import {getSelectedOrder} from "../../../store/SelectedOrder/Selectors";

function mapStateToProps(state) {
    return {
        isSelectedOrder: isSelectedOrder(state),
        createdDateLabel: getOrderPageLabels(state).editTimes.createdDate,
        createdDate: getSelectedOrder(state).createdDate,
        changedDateLabel: getOrderPageLabels(state).editTimes.changedDate,
        changedDate: getSelectedOrder(state).changedDate,
    };
}

export default connect(mapStateToProps)(OrderTimes);
