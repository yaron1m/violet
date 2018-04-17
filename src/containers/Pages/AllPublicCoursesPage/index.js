import {connect} from 'react-redux';
import {selectPublicCourse} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import * as _ from "lodash";
import {redirect} from "../../../util/history-util";
import CustomPaperTable from "../../../components/tables/CustomPaperTable";
import {getPublicCoursesSummary} from "../../../store/PublicCourses/reducer";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.allPublicCoursesPage.title,
        tableHeaders: getLabels(state).pages.allPublicCoursesPage.tableHeaders,
        elements: _.reverse(getPublicCoursesSummary(state)),
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


