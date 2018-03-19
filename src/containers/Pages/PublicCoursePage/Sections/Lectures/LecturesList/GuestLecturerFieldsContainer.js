import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {getSelectedPublicCourseLecture} from "../../../../../../store/selected/reducer";
import GuestLecturerFields from "./GuestLecturerFields";

function mapStateToProps(state, ownProps) {
    return {
        lectureId: ownProps.lectureId,
        showGuestLecturerDetails: getSelectedPublicCourseLecture(state, ownProps.lectureId).guestLecturer === true
    };
}

const Container = connect(mapStateToProps)(GuestLecturerFields);


Container.propTypes = {
    lectureId: PropTypes.string.isRequired,
};

export default Container;