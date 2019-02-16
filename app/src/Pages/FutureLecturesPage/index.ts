import {connect} from 'react-redux';
import {selectOrder} from '../../Store/SelectedOrder/Actions';
import {getLabels} from '../../Store/Labels/Selectors';
import {redirect} from '../../Util/HistoryUtil';
import CustomPaperTable from '../../Components/Table/CustomPaperTable';
import * as _ from 'lodash';
import {getAllLectureTimes, ILectureTimeSummary} from '../../Store/Orders/Selectors';
import {Status} from '../../Util/Constants/Status';
import {selectPublicCourse} from '../../Store/SelectedPublicCourse/Actions';
import {EntityType} from '../../Util/Constants/EntityType';
import {Path} from '../Path';
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';

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
        title: getLabels(state).pages.futureLecturesPage.table.title,
        tableHeaders: getLabels(state).pages.futureLecturesPage.table.tableHeaders,
        elements: getFutureLectureTimes(state),
        rowIndexKey: 'info',
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (summary: ILectureTimeSummary) => {
            switch (summary.entityType) {
                case EntityType.order:
                    dispatch(selectOrder(summary.entityId));
                    redirect(Path.order);
                    return;

                case EntityType.publicCourse:
                    dispatch(selectPublicCourse(summary.entityId.toString()));
                    redirect(Path.publicCourse);
                    return;

                default:
                    return;
            }
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
