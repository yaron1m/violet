import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/Labels/Selectors";
import CustomPaperTable from "../../../../../components/Table/CustomPaperTable";
import {getLecturesDetails} from "../../../../../store/SelectedPublicCourse/Selectors";

function mapStateToProps(state) {
    const details = getLecturesDetails(state);
    return {
        title: getLabels(state).pages.publicCoursePage.sections.courseLectureDetailsSectionName,
        elements: details,
        tableHeaders: getLabels(state).pages.publicCoursePage.LectureDetailsTableHeaders,
        onEditButton: () => {},
    };
}

export default connect(mapStateToProps)(CustomPaperTable);

