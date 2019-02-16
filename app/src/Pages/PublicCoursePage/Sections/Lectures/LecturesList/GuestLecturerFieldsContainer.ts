import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getSelectedPublicCourseLecture} from '../../../../../Store/SelectedPublicCourse/Selectors';
import GuestLecturerFields from './GuestLecturerFields';
import {IState} from '../../../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState, ownProps: {lectureId: number}) {
    return {
        lectureId: ownProps.lectureId,
        showGuestLecturerDetails: getSelectedPublicCourseLecture(state, ownProps.lectureId).guestLecturer === true
    };
}

export default connect(mapStateToProps)(GuestLecturerFields);