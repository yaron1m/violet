import {connect} from 'react-redux';
import {selectOrder} from "../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../store/Labels/Selectors";
import {redirect} from "../../../util/HistoryUtil";
import CustomPaperTable from "../../../Components/Table/CustomPaperTable";
import * as _ from "lodash";
import {getAllLectureTimes} from "../../../store/orders/selectors";
import {Status} from "../../../util/Constants/Status";
import {selectPublicCourse} from "../../../store/SelectedPublicCourse/Actions";
import entityTypes from "../../../util/Constants/EntityTypes";

export function getFutureLectureTimes(state) {
    const lectureTimes = getAllLectureTimes(state, [Status.approvedOrder, Status.isExecuting], true);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    return _.sortBy(
        _.filter(lectureTimes, lectureTime => new Date(lectureTime.date) > yesterday),
        x => x.date);
}

function onEditButton(dispatch, info) {
    switch (info.type) {
        case entityTypes.order:
            dispatch(selectOrder(info.id));
            redirect('/form');
            return;

        case entityTypes.publicCourse:
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
