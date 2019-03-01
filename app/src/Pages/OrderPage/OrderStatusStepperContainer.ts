import {connect} from "react-redux";
import OrderStatusStepper from "./OrderStatusStepper";
import {getSelectedOrder} from "../../Store/SelectedOrder/Selectors";
import {getStatusLabels, Status} from "../../Util/Constants/Status";
import {IState} from "../../Interfaces/ReduxInterfaces";

function getStatus(status: Status) {
    return status ? status : Status.contact;
}

function mapStateToProps(state: IState) {
    return {
        status: getStatus(getSelectedOrder(state).status),
        statusLabels: getStatusLabels(),
    };
}

export default connect(mapStateToProps)(OrderStatusStepper);
