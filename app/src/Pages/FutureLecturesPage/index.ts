import {connect} from "react-redux";
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import * as _ from "lodash";
import {getAllLectureTimes, ILectureTimeSummary} from "../../Store/Orders/Selectors";
import {Status} from "@violet/common";
import {selectPublicCourse} from "../../Store/SelectedPublicCourse/Actions";
import {EntityType} from "../../Util/Constants/EntityType";
import {Path} from "../Path";
import {IDispatch, IState} from "../../Interfaces/ReduxInterfaces";
import {IStringObject} from "@violet/common";

export function getFutureLectureTimes(state: IState) {
    const lectureTimes = getAllLectureTimes(state, [Status.approvedOrder, Status.isExecuting]);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    return _.sortBy(
        _.filter(lectureTimes, lectureTime => new Date(lectureTime.date) > yesterday),
        x => x.date);
}

function mapStateToProps(state: IState) {
    return {
        title: "הרצאות עתידיות",
        elements: getFutureLectureTimes(state),
        rowIndexKey: "info",
        tableHeaders: [
            {orderId: "מספר הזמנה"},
            {date: "תאריך הרצאה"},
            {topic: "נושא"},
            {organizationName: "שם הארגון"},
            {edit: "עריכה"}
        ] as IStringObject[]
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (summary: ILectureTimeSummary) => {
            switch (summary.entityType) {
                case EntityType.order:
                    dispatch(selectOrder(summary.id));
                    redirect(Path.order);
                    return;

                case EntityType.publicCourse:
                    dispatch(selectPublicCourse(summary.id.toString()));
                    redirect(Path.publicCourse);
                    return;

                default:
                    return;
            }
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
