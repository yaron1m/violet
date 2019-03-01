import {connect} from "react-redux";
import {getSelectedOrder} from "../../../Store/SelectedOrder/Selectors";
import FollowUpPrintSection from "./FollowUpPrint";
import {IState} from "../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        selectedOrder: getSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(FollowUpPrintSection);
