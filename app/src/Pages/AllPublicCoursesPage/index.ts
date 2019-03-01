import {connect} from "react-redux";
import {selectPublicCourse} from "../../Store/SelectedPublicCourse/Actions";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {getPublicCoursesSummary, IPublicCourseSummary} from "../../Store/PublicCourses/Selectors";
import {IDispatch, IState} from "../../Interfaces/ReduxInterfaces";
import {Path} from "../Path";
import {IStringObject} from "../../Interfaces/IOrder";

function mapStateToProps(state: IState) {
    return {
        title: "כל הקורסים הציבוריים",
        elements: getPublicCoursesSummary(state),
        limit: 30,
        tableHeaders: [
            {courseName: "שם הקורס"},
            {courseLocation: "מיקום הקורס"},
            {date: "תאריך הרצאה"},
            {courseIncome: "הכנסות"},
            {edit: "עריכה"}
            ] as IStringObject[]
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (courseSummary: IPublicCourseSummary) => {
            dispatch(selectPublicCourse(courseSummary.id.toString()));
            redirect(Path.publicCourse);
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
