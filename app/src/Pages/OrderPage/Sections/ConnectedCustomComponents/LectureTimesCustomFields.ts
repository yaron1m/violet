import {connect} from 'react-redux';
import {getSelectedOrder} from '../../../../Store/SelectedOrder/Selectors';
import {updateLectureTime} from '../../../../Store/SelectedOrder/Actions';
import {getOrderSectionsLabels} from '../../../../Store/Labels/Selectors';
import CustomText from '../../../../Components/CustomComponents/CustomTextField';
import CustomDatePicker from '../../../../Components/CustomComponents/CustomDatePicker';
import CustomAutoComplete from '../../../../Components/CustomComponents/CustomAutoComplete';
import {getRequiredFieldsObject} from '../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors';
import {isRightTabKey} from '../../../../Store/Appearance/RequiredFields/Util';
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';
import {Size} from '../../../../Util/Constants/Size';
import {ISuggestion} from '../../../../Components/AutoSuggest';
import {TabKey} from '../../../../Util/Constants/Status';
import IOrder, {ILectureTime} from '../../../../Interfaces/IOrder';

interface LectureTimesCustomFieldsProps {
    name: string;
    lectureTimeIndex: number;
    size?: Size;
    suggestions?: ISuggestion[];
    onSuggestionSelected?: (suggestion: ISuggestion) => void;
}

function getValues(selectedOrder: IOrder, lectureTimeIndex: number): ILectureTime {
    if (lectureTimeIndex === null || selectedOrder.lectureTimes === undefined)
        return {} as ILectureTime;

    return selectedOrder.lectureTimes[lectureTimeIndex];
}

function mapStateToProps(state: IState, ownProps: LectureTimesCustomFieldsProps) {
    const selectedOrder = getSelectedOrder(state);
    return {
        titles: getOrderSectionsLabels(state).lectureTimes.titles,
        values: getValues(selectedOrder, ownProps.lectureTimeIndex),
        requiredFields: isRightTabKey(selectedOrder, TabKey.internalTabKey, true) ? getRequiredFieldsObject(state).lectureTimes : [],
        name: ownProps.name,
        size: ownProps.size,
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: LectureTimesCustomFieldsProps) {
    return {
        updateAction: (name: string, newValue: any) => {
            dispatch(updateLectureTime(name, newValue, ownProps.lectureTimeIndex));
        }
    };
}

export const LectureTimesCustomText = connect(mapStateToProps, mapDispatchToProps)(CustomText);
export const LectureTimesCustomDatePicker = connect(mapStateToProps, mapDispatchToProps)(CustomDatePicker);
export const LectureTimesCustomAutoComplete = connect(mapStateToProps, mapDispatchToProps)(CustomAutoComplete);
