import {connect} from "react-redux";
import OrderPageTitle from "./OrderPageTitle";
import {getSelectedOrderStatusLabel} from "../../Store/Labels/Selectors";
import {getSelectedOrder, isSelectedOrder} from "../../Store/SelectedOrder/Selectors";
import {IState} from "../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        statusLabel: getSelectedOrderStatusLabel(state),
        title: isSelectedOrder(state) ? "הזמנה מספר " + getSelectedOrder(state).id : "הזמנה חדשה",
    };
}

export default connect(mapStateToProps)(OrderPageTitle);
