import {connect} from "react-redux";
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";
import {updateSelectedOrder} from "../../../../Store/SelectedOrder/Actions";
import CustomTextField from "../../../../Components/CustomComponents/CustomTextField";
import CustomDatePicker from "../../../../Components/CustomComponents/CustomDatePicker";
import CustomToggle from "../../../../Components/CustomComponents/CustomToggle";
import CustomCheckbox from "../../../../Components/CustomComponents/CustomCheckbox";
import CustomSelectField, {IOption} from "../../../../Components/CustomComponents/CustomSelectField";
import {getRequiredFieldsObject} from "../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {IDispatch, IState} from "../../../../Interfaces/ReduxInterfaces";
import {Size} from "../../../../Util/Constants/Size";
import {IOrderStringField} from "../../../../Interfaces/IOrder";

interface OrderCustomFieldsProps {
    name: IOrderStringField;
    title: string,
    size?: Size;
    options?: IOption[],
    fullWidth?: boolean;
    onChange?: (value: string) => void;
}

function mapStateToProps(state: IState, ownProps: OrderCustomFieldsProps) {
    return {
        title: ownProps.title,
        value: getSelectedOrder(state)[ownProps.name],
        isRequired: _.includes(getRequiredFieldsObject(state).order, ownProps.name),
        size: ownProps.size,
        fullWidth: ownProps.fullWidth,
        options: ownProps.options,
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: OrderCustomFieldsProps) {
    return {
        onChange: (value: string) => dispatch(updateSelectedOrder(ownProps.name, value)),
    };
}

export const OrderCustomText = connect(mapStateToProps, mapDispatchToProps)(CustomTextField);
export const OrderCustomDatePicker = connect(mapStateToProps, mapDispatchToProps)(CustomDatePicker);

export const OrderCustomToggle = connect(mapStateToProps, mapDispatchToProps)(CustomToggle);
export const OrderCustomCheckBox = connect(mapStateToProps, mapDispatchToProps)(CustomCheckbox);
export const OrderCustomSelectField = connect(mapStateToProps, mapDispatchToProps)(CustomSelectField);
