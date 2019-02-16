import {connect} from 'react-redux';
import {getLabels} from '../../../../Store/Labels/Selectors';
import CustomPaperTable from '../../../../Components/Table/CustomPaperTable';
import {getSelectedPublicCourseParticipants, ISelectedPublicCourseParticipantsSummary} from '../../../../Store/SelectedPublicCourse/Selectors';
import {redirect} from '../../../../Util/HistoryUtil';
import {selectOrder} from '../../../../Store/SelectedOrder/Actions';
import {Path} from '../../../Path';
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        title: getLabels(state).pages.publicCoursePage.sections.courseParticipantsSectionName,
        elements: getSelectedPublicCourseParticipants(state),
        tableHeaders: getLabels(state).pages.publicCoursePage.participantsTableHeaders,
        rowIndexKey: 'orderId',
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (summary: ISelectedPublicCourseParticipantsSummary) => {
            dispatch(selectOrder(summary.orderId));
            redirect(Path.order);
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
