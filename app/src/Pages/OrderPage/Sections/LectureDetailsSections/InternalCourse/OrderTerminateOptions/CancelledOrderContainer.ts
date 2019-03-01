import {connect} from "react-redux";
import {updateSelectedOrder} from "../../../../../../Store/SelectedOrder/Actions";
import {getSelectedOrder} from "../../../../../../Store/SelectedOrder/Selectors";
import {getCancellationReasons} from "../../../../../../Store/Lists/Selectors";
import {Status} from "../../../../../../Util/Constants/Status";
import OrderTerminateOption from "./OrderTerminateOption";
import {createOptions} from "../../../../../../Components/CustomComponents/CustomSelectField";
import {IDispatch, IState} from "../../../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        show: getSelectedOrder(state).cancelled === true,
        selectFieldName: "cancellationReason" as "cancellationReason",
        selectFieldTitle: "סיבת ביטול",
        detailsFieldName: "cancellationDetails" as "cancellationDetails",
        detailsFieldTitle: "פרטי הביטול",
        options: createOptions(getCancellationReasons(state)),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onSelectFieldChange: (value: any) => {
            dispatch(updateSelectedOrder("cancellationReason", value));

            // Allow only one terminating status
            if (value === true)
                dispatch(updateSelectedOrder(Status.rejected, false));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTerminateOption);
