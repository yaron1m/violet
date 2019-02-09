import {connect} from 'react-redux';
import {getStatusLabels} from "../../Store/Labels/Selectors";
import OrderStatusStepper from "./OrderStatusStepper";
import {getSelectedOrder} from "../../Store/SelectedOrder/Selectors";
import {progressiveStatuses as Status} from "../../Util/Constants/Status";

function getStatus(status){
    return status ? status : Status.contact
}

function mapStateToProps(state) {
    return {
        status: getStatus(getSelectedOrder(state).status),
        statusLabels: getStatusLabels(state),
    };
}

export default connect(mapStateToProps)(OrderStatusStepper);
