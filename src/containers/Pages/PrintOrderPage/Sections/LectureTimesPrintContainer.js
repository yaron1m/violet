import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/SelectedOrder/Selectors";
import LectureTimesPrintSection from "./LectureTimesPrint";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.lectureTimes.sectionName,
        tableHeaders: getLabels(state).pages.orderPage.sections.lectureTimes.tableHeaders,
        lectureTimes: getSelectedOrder(state).lectureTimes,
    };
}

export default connect(mapStateToProps)(LectureTimesPrintSection);