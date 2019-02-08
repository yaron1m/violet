import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../../../store/SelectedOrder/Actions";
import {getSelectedOrder} from "../../../../../../../store/SelectedOrder/Selectors";
import {getCancellationReasons} from "../../../../../../../store/Lists/Reducer";
import {Status} from "../../../../../../../util/Constants/Status";
import OrderTerminateOption from "./OrderTerminateOption";
import {createOptions} from "../../../../../../../Components/CustomComponents/CustomSelectField";

function mapStateToProps(state) {
    return {
        show: getSelectedOrder(state).cancelled === true,
        selectFieldName: "cancellationReason",
        detailsFieldName: "cancellationDetails",
        options: createOptions(getCancellationReasons(state)),
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
