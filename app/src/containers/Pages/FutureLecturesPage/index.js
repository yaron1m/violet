import {connect} from 'react-redux';
import {selectOrder} from "../../../Store/SelectedOrder/Actions";
import {getLabels} from "../../../Store/Labels/Selectors";
import {redirect} from "../../../util/HistoryUtil";
import CustomPaperTable from "../../../Components/Table/CustomPaperTable";
import * as _ from "lodash";
import {getAllLectureTimes} from "../../../Store/Orders/Selectors.ts";
import {Status} from "../../../util/Constants/Status";
import {selectPublicCourse} from "../../../Store/SelectedPublicCourse/Actions";
import {EntityType} from "../../../util/Constants/EntityType";

export function getFutureLectureTimes(state) {
    const lectureTimes = getAllLectureTimes(state, [Status.approvedOrder, Status.isExecuting]);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    return _.sortBy(
        _.filter(lectureTimes, lectureTime => new Date(lectureTime.date) > yesterday),
        x => x.date);
}

function onEditButton(dispatch, info) {
    switch (info.type) {
        case EntityType.order:
            dispatch(selectOrder(info.id));
            redirect('/form');
            return;

        case EntityType.publicCourse:
            dispatch(selectPublicCourse(info.id));
            redirect('/publicCourse');
            return;

        default:
            return;
    }
}

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.futureLecturesPage.table.title,
        tableHeaders: getLabels(state).pages.futureLecturesPage.table.tableHeaders,
        elements: getFutureLectureTimes(state),
        rowIndexKey: "info",
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onEditButton: orderId => onEditButton(dispatch, orderId),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
