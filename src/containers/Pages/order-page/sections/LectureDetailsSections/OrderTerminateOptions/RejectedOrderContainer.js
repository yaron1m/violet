import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../../store/selected/actions";
import {getSelectedOrder} from "../../../../../../store/selected/reducer";
import {getRejectionReasons} from "../../../../../../store/lists/reducer";
import Status from "../../../../../../util/consts/status";
import OrderTerminateOption from "./OrderTerminateOption";

function mapStateToProps(state) {
    return {
        show: getSelectedOrder(state).rejected === true,
        selectFieldName: "rejectionReason",
        detailsFieldName: "rejectionDetails",
        options: getRejectionReasons(state),
    };
}

function mapDispatchToProps(dispatch){
    return {
        updateAction: (key, value) => {
            dispatch(updateSelectedOrder(key, value));

            // Allow only one terminating status
            if (value === true)
                dispatch(updateSelectedOrder(Status.cancelled, false));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTerminateOption);
