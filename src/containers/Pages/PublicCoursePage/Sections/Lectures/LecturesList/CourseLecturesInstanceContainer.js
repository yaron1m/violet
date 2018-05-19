import {connect} from 'react-redux';
import CourseLecturesInstance from "./CourseLecturesInstance";
import PropTypes from "prop-types";
import {getOfferedLectures} from "../../../../../../store/lists/reducer";

function mapStateToProps(state, ownProps) {
    return {
        index: ownProps.index,
        lectureId: ownProps.lectureId,
        offeredLectures: getOfferedLectures(state),
    };
}

const Container = connect(mapStateToProps)(CourseLecturesInstance);

Container.propTypes = {
    lectureId: PropTypes.string.isRequired,
};

export default Container;