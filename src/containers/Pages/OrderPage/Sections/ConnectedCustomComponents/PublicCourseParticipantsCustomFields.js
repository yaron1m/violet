import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {updatePublicCourseParticipant} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import CustomText from "../../../../../components/custom-components/custom-text-field";
import CustomDatePicker from "../../../../../components/custom-components/custom-date-picker";
import CustomAutoComplete from "../../../../../components/custom-components/custom-autocomplete";
import CustomCheckbox from "../../../../../components/custom-components/custom-checkbox";

function getValues(state, ownProps) {
    if (ownProps.participantIndex === null || getSelectedOrder(state).publicCourseParticipants === undefined)
        return null;

    return getSelectedOrder(state).publicCourseParticipants[ownProps.participantIndex];
}

function mapStateToProps(state, ownProps) {
    return {
        titles: getLabels(state).pages.orderPage.sections.publicCourse.titles,
        values: getValues(state, ownProps),
        //requiredFields: getRequiredFieldsObject(state).lectureTimes,
        ...ownProps,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateAction: (key, value) => dispatch(updatePublicCourseParticipant(key, value, ownProps.participantIndex))
    };
}

export const PublicCourseParticipantsCustomText = connect(mapStateToProps, mapDispatchToProps)(CustomText);
export const PublicCourseParticipantsCustomDatePicker = connect(mapStateToProps, mapDispatchToProps)(CustomDatePicker);
export const PublicCourseParticipantsCustomAutoComplete = connect(mapStateToProps, mapDispatchToProps)(CustomAutoComplete);
export const PublicCourseParticipantsCustomCheckBox = connect(mapStateToProps, mapDispatchToProps)(CustomCheckbox);

