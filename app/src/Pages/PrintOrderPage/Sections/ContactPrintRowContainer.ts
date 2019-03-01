import {connect} from "react-redux";
import ContactsPrintRow from "./ContactPrintRow";
import {IState} from "../../../Interfaces/ReduxInterfaces";
import {getSelectedOrder} from "../../../Store/SelectedOrder/Selectors";

function mapStateToProps(state: IState, ownProps: { isFinancial: boolean }) {
    return {
        selectedOrder: getSelectedOrder(state),
        isFinancial: ownProps.isFinancial
    };
}

export default connect(mapStateToProps)(ContactsPrintRow);