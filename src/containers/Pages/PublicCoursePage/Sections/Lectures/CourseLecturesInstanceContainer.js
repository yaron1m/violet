import {connect} from 'react-redux';
import CourseLecturesInstance from "./CourseLecturesInstance";
import PropTypes from "prop-types";
import {getOfferedLectures} from "../../../../../store/lists/reducer";
import {getSelectedPublicCourseLecture} from "../../../../../store/selected/reducer";

function mapStateToProps(state, ownProps) {
    return {
        lectureId : ownProps.lectureId,
        offeredLectures: getOfferedLectures(state),
        showGuestLecturerDetails: getSelectedPublicCourseLecture(state,ownProps.lectureId).guestLecturer === true
    };
}

const Container= connect(mapStateToProps)(CourseLecturesInstance);


Container.propTypes = {
    lectureId: PropTypes.number.isRequired,
};

export default Container;