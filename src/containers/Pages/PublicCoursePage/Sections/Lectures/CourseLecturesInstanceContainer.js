import {connect} from 'react-redux';
import CourseLecturesInstance from "./CourseLecturesInstance";
import PropTypes from "prop-types";

function mapStateToProps(state, ownProps) {
    return {
        lectureId : ownProps.lectureId,
    };
}

const Container= connect(mapStateToProps)(CourseLecturesInstance);


Container.propTypes = {
    lectureId: PropTypes.string.isRequired,
};

export default Container;