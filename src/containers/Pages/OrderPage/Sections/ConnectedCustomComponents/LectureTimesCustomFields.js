import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import CustomText from "../../../../../components/custom-components/custom-text-field";
import CustomDatePicker from "../../../../../components/custom-components/custom-date-picker";
import * as Immutable from "seamless-immutable";
import CustomAutoComplete from "../../../../../components/custom-components/custom-autocomplete";
import {calculateDuration} from "../../../../../util/time-util";

function getValues(state, ownProps) {
    if (ownProps.lectureTimeIndex === null || getSelectedOrder(state).lectureTimes === undefined)
        return null;

    return getSelectedOrder(state).lectureTimes[ownProps.lectureTimeIndex];
}

function updateLectureTime(key, value, lectureTimeIndex, orderUpdateAction, selectedOrder) {
    let lectureTimes = Immutable.asMutable(selectedOrder.lectureTimes, {deep: true});
    lectureTimes[lectureTimeIndex][key] = value;
    lectureTimes[lectureTimeIndex].duration = calculateDuration(lectureTimes[lectureTimeIndex]);
    orderUpdateAction("lectureTimes", lectureTimes);
}

function mapStateToProps(state, ownProps) {
    return {
        titles: getLabels(state).pages.orderPage.sections.lectureTimes.editDialog.titles,
        values: getValues(state, ownProps),
        requiredFields: getRequiredFields(state).lectureTimes,
        SelectedOrder: getSelectedOrder(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderUpdateAction: (key, value) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {

        titles: stateProps.titles,
        values: stateProps.values,
        requiredFields: stateProps.requiredFields,
        updateAction: (key, value) =>
            updateLectureTime(key, value, ownProps.lectureTimeIndex,
                dispatchProps.orderUpdateAction, stateProps.SelectedOrder),
        ...ownProps,
    };
}

export const LectureTimesCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const LectureTimesCustomDatePicker = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomDatePicker);
export const LectureTimesCustomAutoComplete = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomAutoComplete);

