import {Size} from "../../Util/Constants/Size";
import {IStringObject} from "../../Interfaces/IOrder";

export interface AbstractCustomFieldProps<ValueType> {
    title: string;
    value: ValueType;
    isRequired: boolean;
    onChange: (newValue: ValueType) => void;
    fullWidth?: boolean;
    size?: Size;
    classes?: IStringObject;
}