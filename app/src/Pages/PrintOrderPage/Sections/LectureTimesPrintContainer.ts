import {connect} from "react-redux";
import {getSelectedOrder} from "../../../Store/SelectedOrder/Selectors";
import LectureTimesPrintSection from "./LectureTimesPrint";
import {IState} from "../../../Interfaces/ReduxInterfaces";
import {IStringObject} from "../../../Interfaces/IOrder";

function mapStateToProps(state: IState) {
    return {
        lectureTimes: getSelectedOrder(state).lectureTimes,
        tableHeaders: [
            {date: "תאריך"},
            {startTime: "שעת התחלה"},
            {endTime: "שעת סיום"},
            {duration: "משך"},
            {topic: "נושא"},
            {audienceSize: "מס' משתתפים"},
            {tie: "עניבה"},
            {edit: "עריכה"}
        ] as IStringObject[],
    };
}

export default connect(mapStateToProps)(LectureTimesPrintSection);