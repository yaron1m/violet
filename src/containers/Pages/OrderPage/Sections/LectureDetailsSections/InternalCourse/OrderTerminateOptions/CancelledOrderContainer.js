import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../../../store/SelectedOrder/Actions";
import {getSelectedOrder} from "../../../../../../../store/SelectedOrder/Selectors";
import {getCancellationReasons} from "../../../../../../../store/lists/reducer";
import Status from "../../../../../../../util/consts/status";
import OrderTerminateOption from "./OrderTerminateOption";

function mapStateToProps(state) {
    return {
        show: getSelectedOrder(state).cancelled === true,
        selectFieldName: "cancellationReason",
        detailsFieldName: "cancellationDetails",
        options: getCancellationReasons(state),
    };
}

function mapDispatchToProps(dispatch){
    return {
        updateAction: (key, value) => {
            dispatch(updateSelectedOrder(key, value));

            // Allow only one terminating status
            if (value === true)
                dispatch(updateSelectedOrder(Status.rejected, false));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTerminateOption);
