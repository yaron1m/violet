import {connect} from 'react-redux';
import {getSelectedPublicCourse} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {updateSelectedPublicCourse} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import CustomText from "../../../../../components/custom-components/custom-text-field";
import CustomDatePicker from "../../../../../components/custom-components/custom-date-picker";
import CustomToggle from "../../../../../components/custom-components/custom-toggle";
import CustomCheckbox from "../../../../../components/custom-components/custom-checkbox";
import CustomSelectField from "../../../../../components/custom-components/custom-select-field";

function mapStateToProps(state) {
    return {
        titles: getLabels(state).pages.publicCoursePage.fieldTitles,
        values: getSelectedPublicCourse(state),
        requiredFields: getRequiredFields(state).order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAction: (key, value) => dispatch(updateSelectedPublicCourse(key, value)),
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        titles: stateProps.titles,
        values: stateProps.values,
        requiredFields: stateProps.requiredFields,
        updateAction: dispatchProps.updateAction,
        ...ownProps,
    };

}

export const PublicCourseConnectedText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const PublicCourseConnectedDatePicker = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomDatePicker);
export const PublicCourseConnectedToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);
export const PublicCourseConnectedCheckBox = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomCheckbox);
export const PublicCourseConnectedSelectField = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomSelectField);

