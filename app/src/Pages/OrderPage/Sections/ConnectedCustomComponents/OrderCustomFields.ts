import {connect} from 'react-redux';
import {getSelectedOrder} from '../../../../Store/SelectedOrder/Selectors';
import {updateSelectedOrder} from '../../../../Store/SelectedOrder/Actions';
import {getOrderSectionsLabels} from '../../../../Store/Labels/Selectors';
import CustomText from '../../../../Components/CustomComponents/CustomTextField';
import CustomDatePicker from '../../../../Components/CustomComponents/CustomDatePicker';
import CustomToggle from '../../../../Components/CustomComponents/CustomToggle';
import CustomCheckbox from '../../../../Components/CustomComponents/CustomCheckbox';
import CustomSelectField, {IOption} from '../../../../Components/CustomComponents/CustomSelectField';
import {getRequiredFieldsObject} from '../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors';
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';
import {Size} from '../../../../Util/Constants/Size';
import {IPublicCourseLecture} from '../../../../Interfaces/IPublicCourse';
import IOrder, {IStringObject} from '../../../../Interfaces/IOrder';

interface OrderCustomFieldsProps {
    name: string;
    size?: Size;
    updateAction?: (key: string, value: string | IPublicCourseLecture[]) => void;
    options?: IOption[],
    fullWidth?: boolean;
}

function mapStateToProps(state: IState) {
    return {
        titles: getOrderSectionsLabels(state).titles,
        values: getSelectedOrder(state),
        requiredFields: getRequiredFieldsObject(state).order,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        updateAction: (key: string, value: any) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps: {
    titles: IStringObject; values: IOrder; requiredFields: string[];
}, dispatchProps: {
    updateAction: (key: string, value: string | IPublicCourseLecture[]) => void
}, ownProps: OrderCustomFieldsProps) {
    return {
        titles: stateProps.titles,
        values: stateProps.values,
        requiredFields: stateProps.requiredFields,
        updateAction: ownProps.updateAction ? ownProps.updateAction : dispatchProps.updateAction,
        name: ownProps.name,
        size: ownProps.size,
        options: ownProps.options,
        fullWidth: ownProps.fullWidth,
    };

}

export const OrderCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const OrderCustomDatePicker = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomDatePicker);
export const OrderCustomToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);
export const OrderCustomCheckBox = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomCheckbox);
export const OrderCustomSelectField = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomSelectField);
