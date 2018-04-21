import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {updateLectureTime} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import CustomText from "../../../../../components/custom-components/custom-text-field";
import CustomDatePicker from "../../../../../components/custom-components/custom-date-picker";
import CustomAutoComplete from "../../../../../components/custom-components/custom-autocomplete";
import {getRequiredFieldsObject} from "../../../../../store/appearance/RequiredFields/RequiredFieldsSelectors";
import {internalTabKey} from "../LectureDetailsSections/LecturesDetailsSectionContainer";
import {isRightTabKey} from "../../../../../store/appearance/RequiredFields/Util";

function getValues(state, ownProps) {
    if (ownProps.lectureTimeIndex === null || getSelectedOrder(state).lectureTimes === undefined)
        return null;

    return getSelectedOrder(state).lectureTimes[ownProps.lectureTimeIndex];
}

function mapStateToProps(state, ownProps) {
    console.log(isRightTabKey(getSelectedOrder(state), internalTabKey, true) ? getRequiredFieldsObject(state).lectureTimes : [])
    return {
        titles: getLabels(state).pages.orderPage.sections.lectureTimes.editDialog.titles,
        values: getValues(state, ownProps),
        requiredFields: isRightTabKey(getSelectedOrder(state), internalTabKey, true) ? getRequiredFieldsObject(state).lectureTimes : [],
        SelectedOrder: getSelectedOrder(state),
        ...ownProps,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateAction: (key, value) => dispatch(updateLectureTime(key, value, ownProps.lectureTimeIndex))
    };
}

export const LectureTimesCustomText = connect(mapStateToProps, mapDispatchToProps)(CustomText);
export const LectureTimesCustomDatePicker = connect(mapStateToProps, mapDispatchToProps)(CustomDatePicker);
export const LectureTimesCustomAutoComplete = connect(mapStateToProps, mapDispatchToProps)(CustomAutoComplete);

