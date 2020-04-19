import {connect} from "react-redux";
import OrderPageTitle from "./OrderPageTitle";
import {getSelectedOrder, isSelectedOrder} from "../../Store/SelectedOrder/Selectors";
import {IState} from "../../Interfaces/ReduxInterfaces";
import {getOrderStatusLabel} from "@violet/common";

function mapStateToProps(state: IState) {
    return {
        statusLabel: getOrderStatusLabel(getSelectedOrder(state)),
        title: isSelectedOrder(state) ? "הזמנה מספר " + getSelectedOrder(state).id : "הזמנה חדשה",
    };
}

export default connect(mapStateToProps)(OrderPageTitle);
