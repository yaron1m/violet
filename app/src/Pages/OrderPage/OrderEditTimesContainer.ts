import {connect} from "react-redux";
import {getOrderPageLabels} from "../../Store/Labels/Selectors";
import {isSelectedOrder} from "../../Store/SelectedOrder/Selectors";
import OrderTimes from "./OrderEditTimes";
import {getSelectedOrder} from "../../Store/SelectedOrder/Selectors";
import {IState} from "../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        isSelectedOrder: isSelectedOrder(state),
        createdDateLabel: getOrderPageLabels(state).editTimes.createdDate,
        createdDate: getSelectedOrder(state).createdDate,
        changedDateLabel: getOrderPageLabels(state).editTimes.changedDate,
        changedDate: getSelectedOrder(state).changedDate,
    };
}

export default connect(mapStateToProps)(OrderTimes);
