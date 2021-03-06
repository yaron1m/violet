import {connect} from "react-redux";
import {updateSelectedOrder} from "../../../../../../Store/SelectedOrder/Actions";
import {getSelectedOrder} from "../../../../../../Store/SelectedOrder/Selectors";
import {getRejectionReasons} from "../../../../../../Store/Lists/Selectors";
import {Status} from "@violet/common";
import OrderTerminateOption from "./OrderTerminateOption";
import {createOptions} from "../../../../../../Components/CustomComponents/CustomSelectField";
import {IDispatch, IState} from "../../../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        show: getSelectedOrder(state).rejected === true,
        selectFieldName: "rejectionReason" as "rejectionReason",
        selectFieldTitle: "סיבת דחיה",
        detailsFieldName: "rejectionDetails" as "rejectionDetails",
        detailsFieldTitle: "פרטי הדחיה",
        options: createOptions(getRejectionReasons(state)),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onSelectFieldChange: (value: any) => {
            dispatch(updateSelectedOrder("rejectionReason", value));

            // Allow only one terminating status
            if (value === true)
                dispatch(updateSelectedOrder(Status.cancelled, false));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTerminateOption);
