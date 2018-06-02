import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/SelectedOrder/Selectors";
import {updatePublicCourseParticipant} from "../../../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../../../store/Labels/Reducer";
import CustomText from "../../../../../components/CustomComponents/CustomTextField";
import CustomDatePicker from "../../../../../components/CustomComponents/CustomDatePicker";
import CustomAutoComplete from "../../../../../components/CustomComponents/CustomAutoComplete";
import CustomCheckbox from "../../../../../components/CustomComponents/CustomCheckbox";
import {getRequiredFieldsObject} from "../../../../../store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {isRightTabKey} from "../../../../../store/Appearance/RequiredFields/Util";
import {publicCourseTabKey} from "../../../../../util/Constants/TabKeys";

function getValues(state, ownProps) {
    if (ownProps.participantIndex === null || getSelectedOrder(state).publicCourseParticipants === undefined)
        return null;

    return getSelectedOrder(state).publicCourseParticipants[ownProps.participantIndex];
}

function mapStateToProps(state, ownProps) {
    return {
        titles: getLabels(state).pages.orderPage.sections.publicCourse.titles,
        values: getValues(state, ownProps),
        requiredFields: isRightTabKey(getSelectedOrder(state), publicCourseTabKey) ? getRequiredFieldsObject(state).publicCourse : [],
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

