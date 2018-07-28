import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../../../store/SelectedOrder/Actions";
import {getSelectedOrder} from "../../../../../../../store/SelectedOrder/Selectors";
import {getRejectionReasons} from "../../../../../../../store/Lists/Reducer";
import Status from "../../../../../../../util/Constants/Status";
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
