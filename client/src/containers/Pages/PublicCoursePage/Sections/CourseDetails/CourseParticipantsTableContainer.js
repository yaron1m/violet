import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/Labels/Reducer";
import CustomPaperTable from "../../../../../components/tables/CustomPaperTable";
import {getSelectedPublicCourseParticipants} from "../../../../../store/SelectedPublicCourse/Selectors";
import {redirect} from "../../../../../util/HistoryUtil";
import {selectOrder} from "../../../../../store/SelectedOrder/Actions";

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

