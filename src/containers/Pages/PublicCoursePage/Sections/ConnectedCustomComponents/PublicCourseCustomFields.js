import {connect} from 'react-redux';
import {getSelectedPublicCourse} from "../../../../../store/SelectedPublicCourse/Selectors";
import {updateSelectedPublicCourse} from "../../../../../store/SelectedPublicCourse/Actions";
import {getLabels} from "../../../../../store/Labels/Reducer";
import CustomText from "../../../../../components/CustomComponents/CustomTextField";
import CustomDatePicker from "../../../../../components/CustomComponents/CustomDatePicker";
import CustomToggle from "../../../../../components/CustomComponents/CustomToggle";
import CustomCheckbox from "../../../../../components/CustomComponents/CustomCheckbox";
import CustomSelectField from "../../../../../components/CustomComponents/CustomSelectField";

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

