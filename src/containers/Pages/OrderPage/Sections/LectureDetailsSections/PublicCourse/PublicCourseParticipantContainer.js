import {connect} from 'react-redux';
import PropTypes from "prop-types";
import PublicCourseParticipant from "./PublicCourseParticipant";
import {getSelectedPublicCourse} from "../../../../../../store/selected/reducer";

function mapStateToProps(state, ownProps) {
    return {
        participantId: ownProps.participantId,
        selectedPublicCourseLectures: getSelectedPublicCourse(state) ? getSelectedPublicCourse(state).lectures : [],
    };
}

const Container = connect(mapStateToProps)(PublicCourseParticipant);

Container.propTypes = {
    participantId: PropTypes.number.isRequired,
};

export default Container;