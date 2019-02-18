import {connect} from "react-redux";
import {getSelectedOrder} from "../../../../../../Store/SelectedOrder/Selectors";
import {IState} from "../../../../../../Interfaces/ReduxInterfaces";
import PreparationTimes from "./PreparationTimes";
import {getOrderSectionsLabels} from "../../../../../../Store/Labels/Selectors";
import {IStringObject} from "../../../../../../Interfaces/IOrder";

function mapStateToProps(state: IState, ownProps: {lectureTimeIndex: number}) {
    return {
        labels: getOrderSectionsLabels(state).lectureTimes.preparationTimes as IStringObject,
        lectureTime: getSelectedOrder(state).lectureTimes[ownProps.lectureTimeIndex]
    };
}

export default connect(mapStateToProps)(PreparationTimes);