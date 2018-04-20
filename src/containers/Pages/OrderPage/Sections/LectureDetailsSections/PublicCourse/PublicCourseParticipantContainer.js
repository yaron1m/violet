import {connect} from 'react-redux';
import PropTypes from "prop-types";
import PublicCourseParticipant from "./PublicCourseParticipant";

function mapStateToProps(state, ownProps) {
    return {
        participantId: ownProps.participantId,
    };
}

const Container = connect(mapStateToProps)(PublicCourseParticipant);

Container.propTypes = {
    participantId: PropTypes.number.isRequired,
};

export default Container;