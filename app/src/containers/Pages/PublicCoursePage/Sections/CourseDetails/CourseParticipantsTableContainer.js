import {connect} from 'react-redux';
import {getLabels} from "../../../../../Store/Labels/Selectors";
import CustomPaperTable from "../../../../../Components/Table/CustomPaperTable";
import {getSelectedPublicCourseParticipants} from "../../../../../Store/SelectedPublicCourse/Selectors";
import {redirect} from "../../../../../util/HistoryUtil";
import {selectOrder} from "../../../../../Store/SelectedOrder/Actions";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.publicCoursePage.sections.courseParticipantsSectionName,
        elements: getSelectedPublicCourseParticipants(state),
        tableHeaders: getLabels(state).pages.publicCoursePage.participantsTableHeaders,
        rowIndexKey: "orderId",
    };
}

function mapDispatchToProps(dispatch){
    return {
        onEditButton: (orderId) => {
            dispatch(selectOrder(orderId));
            redirect('/form');
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);

