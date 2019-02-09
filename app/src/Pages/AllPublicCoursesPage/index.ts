import {connect} from 'react-redux';
import {selectPublicCourse} from "../../Store/SelectedPublicCourse/Actions";
import {getLabels} from "../../Store/Labels/Selectors";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {getPublicCoursesSummary, IPublicCourseSummary} from "../../Store/PublicCourses/Selectors";
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';
import {Path} from '../Path';

function mapStateToProps(state: IState) {
    return {
        title: getLabels(state).pages.allPublicCoursesPage.title,
        tableHeaders: getLabels(state).pages.allPublicCoursesPage.tableHeaders,
        elements: getPublicCoursesSummary(state),
        limit: 30,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (courseSummary: IPublicCourseSummary) => {
            dispatch(selectPublicCourse(courseSummary.id.toString()));
            redirect(Path.publicCourse);
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);

