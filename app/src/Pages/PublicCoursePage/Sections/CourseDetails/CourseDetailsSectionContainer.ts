import {connect} from 'react-redux';
import {getLabels} from '../../../../Store/Labels/Selectors';
import CourseDetailsSection from './CourseDetailsSection';
import {IState} from '../../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        sectionName: getLabels(state).pages.publicCoursePage.sections.courseDetailsSectionName,
    };
}

export default connect(mapStateToProps)(CourseDetailsSection);
