import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../../Store/SelectedOrder/Actions";
import {getSelectedOrder} from "../../../../../../Store/SelectedOrder/Selectors";
import {getRejectionReasons} from "../../../../../../Store/Lists/Selectors";
import {Status} from "../../../../../../Util/Constants/Status";
import OrderTerminateOption from "./OrderTerminateOption";
import {createOptions} from "../../../../../../Components/CustomComponents/CustomSelectField";

function mapStateToProps(state: IState) {
    return {
        show: getSelectedOrder(state).rejected === true,
        selectFieldName: "rejectionReason",
        detailsFieldName: "rejectionDetails",
        options: createOptions(getRejectionReasons(state)),
    };
}

function mapDispatchToProps(dispatch :IDispatch){
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
