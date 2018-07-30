import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/Labels/Reducer";
import CustomPaperTable from "../../../../../components/tables/CustomPaperTable";
import {getSelectedPublicCourseParticipants} from "../../../../../store/SelectedPublicCourse/Selectors";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.publicCoursePage.sections.courseParticipantsSectionName,
        elements: getSelectedPublicCourseParticipants(state),
        tableHeaders: getLabels(state).pages.publicCoursePage.participantsTableHeaders,
        onEditButton: () => {}, //TODO redirect to order


    };
}

export default connect(mapStateToProps)(CustomPaperTable);

