import {connect} from 'react-redux';
import CourseLecturesInstance from "./CourseLecturesInstance";
import PropTypes from "prop-types";
import {getOfferedLectures} from "../../../../../../store/lists/reducer";
import {deleteLectureFromSelectedPublicCourse} from "../../../../../../store/selected/actions";

function mapStateToProps(state, ownProps) {
    return {
        index: ownProps.index,
        lectureId: ownProps.lectureId,
        offeredLectures: getOfferedLectures(state),
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onDelete: () => dispatch(deleteLectureFromSelectedPublicCourse(ownProps.lectureId)),
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(CourseLecturesInstance);


Container.propTypes = {
    lectureId: PropTypes.string.isRequired,
};

export default Container;