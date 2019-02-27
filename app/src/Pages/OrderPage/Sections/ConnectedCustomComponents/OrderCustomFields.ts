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
import {IOrderBooleanField, IOrderStringField} from "../../../../Interfaces/IOrder";
import _ from "lodash";

interface OrderFieldProps {
    title: string,
    size?: Size;
    options?: IOption[],
    fullWidth?: boolean;

}

interface OrderStringFieldProps extends OrderFieldProps {
    name: IOrderStringField;
    onChange?: (value: string) => void;
}

interface OrderBooleanFieldProps extends OrderFieldProps {
    name: IOrderBooleanField;
    onChange?: (value: boolean) => void;
}

function mapStateToPropsString(state: IState, ownProps: OrderStringFieldProps) {
    return {
        title: ownProps.title,
        value: getSelectedOrder(state)[ownProps.name],
        isRequired: _.includes(getRequiredFieldsObject(state).order, ownProps.name),
        size: ownProps.size,
        fullWidth: ownProps.fullWidth,
        options: ownProps.options,
    };
}

function mapDispatchToPropsString(dispatch: IDispatch, ownProps: OrderStringFieldProps) {
    return {
        onChange: (value: string) => dispatch(updateSelectedOrder(ownProps.name, value)),
    };
}

export const OrderCustomText = connect(mapStateToPropsString, mapDispatchToPropsString)(CustomTextField);
export const OrderCustomDatePicker = connect(mapStateToPropsString, mapDispatchToPropsString)(CustomDatePicker);
export const OrderCustomSelectField = connect(mapStateToPropsString, mapDispatchToPropsString)(CustomSelectField);

function mapStateToPropsBoolean(state: IState, ownProps: OrderBooleanFieldProps) {
    return {
        title: ownProps.title,
        value: getSelectedOrder(state)[ownProps.name],
        isRequired: _.includes(getRequiredFieldsObject(state).order, ownProps.name),
        size: ownProps.size,
        fullWidth: ownProps.fullWidth,
    };
}

function mapDispatchToPropsBoolean(dispatch: IDispatch, ownProps: OrderBooleanFieldProps) {
    return {
        onChange: (value: boolean) => dispatch(updateSelectedOrder(ownProps.name, value)),
    };
}

export const OrderCustomToggle = connect(mapStateToPropsBoolean, mapDispatchToPropsBoolean)(CustomToggle);
export const OrderCustomCheckBox = connect(mapStateToPropsBoolean, mapDispatchToPropsBoolean)(CustomCheckbox);
