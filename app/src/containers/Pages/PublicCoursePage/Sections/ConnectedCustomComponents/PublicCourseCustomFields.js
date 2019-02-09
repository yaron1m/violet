import {connect} from 'react-redux';
import {getSelectedPublicCourse} from "../../../../../Store/SelectedPublicCourse/Selectors";
import {updateSelectedPublicCourse} from "../../../../../Store/SelectedPublicCourse/Actions";
import {getLabels} from "../../../../../Store/Labels/Selectors";
import CustomText from "../../../../../Components/CustomComponents/CustomTextField";
import CustomDatePicker from "../../../../../Components/CustomComponents/CustomDatePicker";
import CustomToggle from "../../../../../Components/CustomComponents/CustomToggle";
import CustomCheckbox from "../../../../../Components/CustomComponents/CustomCheckbox";
import CustomSelectField from "../../../../../Components/CustomComponents/CustomSelectField";

function mapStateToProps(state) {
    return {
        titles: getLabels(state).pages.publicCoursePage.fieldTitles,
        values: getSelectedPublicCourse(state),
        //requiredFields: getRequiredFieldsObject(state).order,
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

