import {connect} from 'react-redux';
import Sizes from "../../../../../../util/consts/sizes";
import {getPublicCourses} from "../../../../../../store/PublicCourses/reducer";
import _ from 'lodash';
import {PublicCourseConnectedSelectField} from "../../../../PublicCoursePage/Sections/ConnectedCustomComponents/PublicCourseCustomFields";
import {
    removeParticipantsFromAllLectures,
    selectPublicCourse,
    updateSelectedOrder
} from "../../../../../../store/selected/actions";
import {getSelectedOrder} from "../../../../../../store/selected/reducer";
import {isEmptyValue} from "../../../../../../util/string-util";

function getOption(course) {
    return {
        key: course.id,
        label: course.courseName,
    }
}

function getValues(selectedOrder, publicCourses) {
    if (isEmptyValue(selectedOrder, "publicCourseId"))
        return {};

    return {
        courseName: publicCourses[selectedOrder.publicCourseId].id
    };
}

export function selectFieldUpdateAction(dispatch, newValue) {
    dispatch(selectPublicCourse(newValue));
    dispatch(updateSelectedOrder("publicCourseId", newValue));
    dispatch(removeParticipantsFromAllLectures());
}

function mapStateToProps(state) {
    return {
        name: "courseName",
        options: _.map(getPublicCourses(state), getOption),
        size: Sizes.XL,
        values: getValues(getSelectedOrder(state), getPublicCourses(state)),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAction: (key, value) => selectFieldUpdateAction(dispatch, value)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicCourseConnectedSelectField);