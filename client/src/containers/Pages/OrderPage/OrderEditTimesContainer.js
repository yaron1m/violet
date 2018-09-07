import {connect} from 'react-redux';
import {getLabels} from "../../../store/Labels/Selectors";
import {isSelectedOrder} from "../../../store/SelectedOrder/Selectors";
import OrderTimes from "./OrderEditTimes";
import {getSelectedOrder} from "../../../store/SelectedOrder/Selectors";

function mapStateToProps(state) {
    return {
        isSelectedOrder: isSelectedOrder(state),
        createdDateLabel: getLabels(state).pages.orderPage.editTimes.createdDate,
        createdDate: getSelectedOrder(state).createdDate,
        changedDateLabel: getLabels(state).pages.orderPage.editTimes.changedDate,
        changedDate: getSelectedOrder(state).changedDate,
    };
}

export default connect(mapStateToProps)(OrderTimes);
