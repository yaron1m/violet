import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrder} from "../../../store/selected/reducer";
import OrderTimes from "./OrderEditTimes";

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
