import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/SelectedOrder/Selectors";
import {updateLectureTime} from "../../../../../store/SelectedOrder/Actions";
import {getOrderSectionsLabels} from "../../../../../store/Labels/Selectors";
import CustomText from "../../../../../components/CustomComponents/CustomTextField";
import CustomDatePicker from "../../../../../components/CustomComponents/CustomDatePicker";
import CustomAutoComplete from "../../../../../components/CustomComponents/CustomAutoComplete";
import {getRequiredFieldsObject} from "../../../../../store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {internalTabKey} from "../../../../../util/Constants/TabKeys";
import {isRightTabKey} from "../../../../../store/Appearance/RequiredFields/Util";

function getValues(state, ownProps) {
    if (ownProps.lectureTimeIndex === null || getSelectedOrder(state).lectureTimes === undefined)
        return null;

    return getSelectedOrder(state).lectureTimes[ownProps.lectureTimeIndex];
}

function mapStateToProps(state, ownProps) {
    return {
        titles: getOrderSectionsLabels(state).lectureTimes.titles,
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

