import {connect} from 'react-redux';
import {getSelectedPublicCourseLecture} from "../../../../../store/SelectedPublicCourse/Selectors";
import {updatePublicCourseLecture} from "../../../../../store/SelectedPublicCourse/Actions";
import {getLabels} from "../../../../../store/Labels/Selectors";
import CustomText from "../../../../../Components/CustomComponents/CustomTextField";
import CustomDatePicker from "../../../../../Components/CustomComponents/CustomDatePicker";
import CustomToggle from "../../../../../Components/CustomComponents/CustomToggle";
import CustomCheckbox from "../../../../../Components/CustomComponents/CustomCheckbox";
import CustomSelectField from "../../../../../Components/CustomComponents/CustomSelectField";
import CustomAutoComplete from "../../../../../Components/CustomComponents/CustomAutoComplete";

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

