import {connect} from "react-redux";
import {Size} from "../../../../../Util/Constants/Size";
import {getActivePublicCourses, getPublicCourseById} from "../../../../../Store/PublicCourses/Selectors";
import _ from "lodash";
import {selectPublicCourse} from "../../../../../Store/SelectedPublicCourse/Actions";
import {getSelectedOrder} from "../../../../../Store/SelectedOrder/Selectors";
import {isEmptyValue} from "../../../../../Util/StringUtil";
import {removeParticipantsFromAllLectures, updateSelectedOrder} from "../../../../../Store/SelectedOrder/Actions";
import {IDispatch, IState} from "../../../../../Interfaces/ReduxInterfaces";
import IOrder from "../../../../../Interfaces/IOrder";
import IPublicCourse from "../../../../../Interfaces/IPublicCourse";
import CustomSelectField, {IOption} from "../../../../../Components/CustomComponents/CustomSelectField";

function getOption(course: IPublicCourse): IOption {
    return {
        key: course.id.toString(),
        label: course.courseName,
    };
}

function getValue(selectedOrder: IOrder, getPublicCourseById: (id: number) => IPublicCourse) {
    if (isEmptyValue(selectedOrder, "publicCourseId"))
        return "";

    return getPublicCourseById(selectedOrder.publicCourseId).id.toString();
}

export function selectFieldUpdateAction(dispatch: IDispatch, newValue: string) {
    dispatch(selectPublicCourse(newValue.toString()));
    dispatch(updateSelectedOrder("publicCourseId", newValue));
    dispatch(removeParticipantsFromAllLectures());
}

function mapStateToProps(state: IState) {
    return {
        title: "שם הקורס",
        options: _.map(getActivePublicCourses(state), getOption),
        size: Size.XL,
        value: getValue(getSelectedOrder(state), (id: number) => getPublicCourseById(state, id.toString())),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onChange: (value: string) => selectFieldUpdateAction(dispatch, value)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSelectField);
