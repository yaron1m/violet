import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";
import {updateLectureTime} from "../../../../Store/SelectedOrder/Actions";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import CustomText from "../../../../Components/CustomComponents/CustomTextField";
import CustomDatePicker from "../../../../Components/CustomComponents/CustomDatePicker";
import CustomAutoComplete from "../../../../Components/CustomComponents/CustomAutoComplete";
import {getRequiredFieldsObject} from "../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {isRightTabKey} from "../../../../Store/Appearance/RequiredFields/Util";
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';
import {Size} from '../../../../Util/Constants/Size';
import {ISuggestion} from '../../../../Components/AutoSuggest';
import {TabKey} from '../../../../Util/Constants/Status';

interface LectureTimesCustomFieldsProps {
    name: string;
    lectureTimeIndex: number;
    size?: Size;
    suggestions?: ISuggestion[];
    onSuggestionSelected?: (suggestion: ISuggestion) => void;
}

function getValues(state: IState, ownProps:LectureTimesCustomFieldsProps) : {[key:string]:any} {
    if (ownProps.lectureTimeIndex === null || getSelectedOrder(state).lectureTimes === undefined)
        return {};

    return getSelectedOrder(state).lectureTimes[ownProps.lectureTimeIndex];
}

function mapStateToProps(state: IState, ownProps:LectureTimesCustomFieldsProps) {
    return {
        titles: getOrderSectionsLabels(state).lectureTimes.titles,
        values: getValues(state, ownProps),
        requiredFields: isRightTabKey(getSelectedOrder(state), TabKey.internalTabKey, true) ? getRequiredFieldsObject(state).lectureTimes : [],
        name: ownProps.name,
        size: ownProps.size,
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps:LectureTimesCustomFieldsProps) {
    return {
        updateAction: (name: string, newValue: any) => dispatch(updateLectureTime(name, newValue, ownProps.lectureTimeIndex))
    };
}

export const LectureTimesCustomText = connect(mapStateToProps, mapDispatchToProps)(CustomText);
export const LectureTimesCustomDatePicker = connect(mapStateToProps, mapDispatchToProps)(CustomDatePicker);
export const LectureTimesCustomAutoComplete = connect(mapStateToProps, mapDispatchToProps)(CustomAutoComplete);

