import {connect} from 'react-redux';
import {Size} from "../../../../../util/Constants/Size";
import {getActivePublicCourses, getPublicCourses} from "../../../../../Store/PublicCourses/Selectors";
import _ from 'lodash';
import {PublicCourseConnectedSelectField} from "../../../../PublicCoursePage/Sections/ConnectedCustomComponents/PublicCourseCustomFields";
import {selectPublicCourse} from "../../../../../Store/SelectedPublicCourse/Actions";
import {getSelectedOrder} from "../../../../../Store/SelectedOrder/Selectors";
import {isEmptyValue} from "../../../../../Util/StringUtil";
import {removeParticipantsFromAllLectures, updateSelectedOrder} from "../../../../../Store/SelectedOrder/Actions";

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

function mapStateToProps(state: IState) {
    return {
        name: "courseName",
        options: _.map(getActivePublicCourses(state), getOption),
        size: Size.XL,
        values: getValues(getSelectedOrder(state), getPublicCourses(state)),
    };
}

function mapDispatchToProps(dispatch :IDispatch) {
    return {
        updateAction: (key, value) => selectFieldUpdateAction(dispatch, value)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicCourseConnectedSelectField);
