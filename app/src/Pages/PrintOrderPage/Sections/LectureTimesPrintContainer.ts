import {connect} from "react-redux";
import {getOrderSectionsLabels} from "../../../Store/Labels/Selectors";
import {getSelectedOrder} from "../../../Store/SelectedOrder/Selectors";
import LectureTimesPrintSection from "./LectureTimesPrint";
import {IState} from "../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).lectureTimes.sectionName,
        tableHeaders: getOrderSectionsLabels(state).lectureTimes.tableHeaders,
        lectureTimes: getSelectedOrder(state).lectureTimes,
    };
}

export default connect(mapStateToProps)(LectureTimesPrintSection);