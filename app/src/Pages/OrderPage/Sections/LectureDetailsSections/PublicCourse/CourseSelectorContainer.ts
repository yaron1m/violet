import {connect} from 'react-redux';
import {Size} from "../../../../../util/Constants/Size";
import {getActivePublicCourses, getPublicCourseById} from "../../../../../Store/PublicCourses/Selectors";
import _ from 'lodash';
import {PublicCourseConnectedSelectField} from "../../../../PublicCoursePage/Sections/ConnectedCustomComponents/PublicCourseCustomFields";
import {selectPublicCourse} from "../../../../../Store/SelectedPublicCourse/Actions";
import {getSelectedOrder} from "../../../../../Store/SelectedOrder/Selectors";
import {isEmptyValue} from "../../../../../Util/StringUtil";
import {removeParticipantsFromAllLectures, updateSelectedOrder} from "../../../../../Store/SelectedOrder/Actions";
import {IDispatch, IState} from '../../../../../Interfaces/ReduxInterfaces';
import IOrder from '../../../../../Interfaces/IOrder';
import IPublicCourse from '../../../../../Interfaces/IPublicCourse';
import {IOption} from '../../../../../Components/CustomComponents/CustomSelectField';

function getOption(course:IPublicCourse) :IOption {
    return {
        key: course.id.toString(),
        label: course.courseName,
    }
}

function getValues(selectedOrder: IOrder, getPublicCourseById: (id:number) => IPublicCourse) {
    if (isEmptyValue(selectedOrder, "publicCourseId"))
        return {};

    return {
        courseName: getPublicCourseById(selectedOrder.publicCourseId).id
    };
}

export function selectFieldUpdateAction(dispatch: IDispatch, newValue: number) {
    dispatch(selectPublicCourse(newValue.toString()));
    dispatch(updateSelectedOrder("publicCourseId", newValue));
    dispatch(removeParticipantsFromAllLectures());
}

function mapStateToProps(state: IState) {
    return {
        name: "courseName",
        options: _.map(getActivePublicCourses(state), getOption),
        size: Size.XL,
        values: getValues(getSelectedOrder(state), (id: number) => getPublicCourseById(state, id.toString())),
    };
}

function mapDispatchToProps(dispatch :IDispatch) {
    return {
        updateAction: (key:string, value: number) => selectFieldUpdateAction(dispatch, value)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicCourseConnectedSelectField);
