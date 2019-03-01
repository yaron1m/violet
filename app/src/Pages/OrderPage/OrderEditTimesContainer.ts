import {connect} from "react-redux";
import {getSelectedOrder, isSelectedOrder} from "../../Store/SelectedOrder/Selectors";
import OrderTimes from "./OrderEditTimes";
import {IState} from "../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        isSelectedOrder: isSelectedOrder(state),
        createdDate: getSelectedOrder(state).createdDate,
        changedDate: getSelectedOrder(state).changedDate,
    };
}

export default connect(mapStateToProps)(OrderTimes);
