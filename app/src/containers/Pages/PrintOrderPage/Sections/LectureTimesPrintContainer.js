import connect from "react-redux/es/connect/connect";
import {getOrderSectionsLabels} from "../../../../store/Labels/Selectors";
import {getSelectedOrder} from "../../../../store/SelectedOrder/Selectors";
import LectureTimesPrintSection from "./LectureTimesPrint";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).lectureTimes.sectionName,
        tableHeaders: getOrderSectionsLabels(state).lectureTimes.tableHeaders,
        lectureTimes: getSelectedOrder(state).lectureTimes,
    };
}

export default connect(mapStateToProps)(LectureTimesPrintSection);