import {connect} from 'react-redux';
import {selectPublicCourse} from "../../../Store/SelectedPublicCourse/Actions";
import {getLabels} from "../../../Store/Labels/Selectors";
import {redirect} from "../../../util/HistoryUtil";
import CustomPaperTable from "../../../Components/Table/CustomPaperTable";
import {getPublicCoursesSummary} from "../../../Store/PublicCourses/Selectors";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.allPublicCoursesPage.title,
        tableHeaders: getLabels(state).pages.allPublicCoursesPage.tableHeaders,
        elements: getPublicCoursesSummary(state),
        rowIndexKey: "id",
        limit: 30,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onEditButton: (id) => {
            dispatch(selectPublicCourse(id));
            redirect('/publicCourse');
        },
    };
}

const Container = connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);

export default Container;


