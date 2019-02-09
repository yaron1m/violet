import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";
import {updateLectureTime} from "../../../../Store/SelectedOrder/Actions";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import CustomText from "../../../../Components/CustomComponents/CustomTextField";
import CustomDatePicker from "../../../../Components/CustomComponents/CustomDatePicker";
import CustomAutoComplete from "../../../../Components/CustomComponents/CustomAutoComplete";
import {getRequiredFieldsObject} from "../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {internalTabKey} from "../../../../Util/Constants/TabKeys";
import {isRightTabKey} from "../../../../Store/Appearance/RequiredFields/Util";

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

