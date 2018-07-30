import {connect} from 'react-redux';
import Sizes from "../../../../../../util/Constants/Sizes";
import {getPublicCourses} from "../../../../../../store/PublicCourses/Selectors";
import _ from 'lodash';
import {PublicCourseConnectedSelectField} from "../../../../PublicCoursePage/Sections/ConnectedCustomComponents/PublicCourseCustomFields";
import {selectPublicCourse} from "../../../../../../store/SelectedPublicCourse/Actions";
import {getSelectedOrder} from "../../../../../../store/SelectedOrder/Selectors";
import {isEmptyValue} from "../../../../../../util/StringUtil";
import {removeParticipantsFromAllLectures, updateSelectedOrder} from "../../../../../../store/SelectedOrder/Actions";

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
