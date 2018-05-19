import {connect} from 'react-redux';
import {getSelectedPublicCourseLecture} from "../../../../../store/selected/reducer";
import {updatePublicCourseLecture} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import CustomText from "../../../../../components/custom-components/CustomTextField";
import CustomDatePicker from "../../../../../components/custom-components/custom-date-picker";
import CustomToggle from "../../../../../components/custom-components/custom-toggle";
import CustomCheckbox from "../../../../../components/custom-components/custom-checkbox";
import CustomSelectField from "../../../../../components/custom-components/custom-select-field";
import CustomAutoComplete from "../../../../../components/custom-components/custom-autocomplete";

function mapStateToProps(state, ownProps) {
    return {
        titles: getLabels(state).pages.publicCoursePage.fieldTitles,
        values: getSelectedPublicCourseLecture(state, ownProps.lectureId),
        //requiredFields: getRequiredFieldsObject(state).order,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateAction: (key, value) => dispatch(updatePublicCourseLecture(key, value, ownProps.lectureId)),
    };
}

export const PublicCourseLectureConnectedText = connect(mapStateToProps, mapDispatchToProps)(CustomText);
export const PublicCourseLectureConnectedDatePicker = connect(mapStateToProps, mapDispatchToProps)(CustomDatePicker);
export const PublicCourseLectureConnectedToggle = connect(mapStateToProps, mapDispatchToProps)(CustomToggle);
export const PublicCourseLectureConnectedCheckBox = connect(mapStateToProps, mapDispatchToProps)(CustomCheckbox);
export const PublicCourseLectureConnectedSelectField = connect(mapStateToProps, mapDispatchToProps)(CustomSelectField);
export const PublicCourseLectureConnectedAutoComplete = connect(mapStateToProps, mapDispatchToProps)(CustomAutoComplete);

