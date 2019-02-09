import {connect} from 'react-redux';
import {getLabels} from "../../../../../Store/Labels/Selectors";
import CustomPaperTable from "../../../../../Components/Table/CustomPaperTable";
import {getLecturesDetails} from "../../../../../Store/SelectedPublicCourse/Selectors";

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

