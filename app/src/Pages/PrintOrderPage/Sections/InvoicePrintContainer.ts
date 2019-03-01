import {connect} from "react-redux";
import InvoicePrintSection from "./InvoicePrint";
import {IState} from "../../../Interfaces/ReduxInterfaces";
import {getSelectedOrder} from "../../../Store/SelectedOrder/Selectors";

function mapStateToProps(state: IState) {
    return {
        selectedOrder: getSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(InvoicePrintSection);