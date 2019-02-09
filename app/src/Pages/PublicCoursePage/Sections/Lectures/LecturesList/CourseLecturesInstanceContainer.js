import {connect} from 'react-redux';
import CourseLecturesInstance from "./CourseLecturesInstance";
import PropTypes from "prop-types";
import {getOfferedLectures} from "../../../../../Store/Lists/Selectors";
import {toSuggestions} from "../../../../../Components/AutoSuggest";

function mapStateToProps(state, ownProps) {
    return {
        index: ownProps.index,
        lectureId: ownProps.lectureId,
        offeredLectures: toSuggestions(getOfferedLectures(state)),
    };
}

const Container = connect(mapStateToProps)(CourseLecturesInstance);

Container.propTypes = {
    lectureId: PropTypes.string.isRequired,
};

export default Container;