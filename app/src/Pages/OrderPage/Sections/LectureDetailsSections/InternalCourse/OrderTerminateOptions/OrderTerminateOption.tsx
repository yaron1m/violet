import React from "react";
import {Size} from "../../../../../../Util/Constants/Size";
import {OrderCustomSelectField, OrderCustomText} from "../../../ConnectedCustomComponents/OrderCustomFields";
import {IOption} from '../../../../../../Components/CustomComponents/CustomSelectField';

export default function OrderTerminateOption(props: OrderTerminateOption) {
    if (!props.show)
        return null;

    return (
        <div style={{display: "flex"}}>
            <OrderCustomSelectField
                name={props.selectFieldName}
                options={props.options}
                size={Size.XL}
                updateAction={props.updateAction}
            />
            <OrderCustomText name={props.detailsFieldName} fullWidth={true}/>
        </div>
    );
}

interface OrderTerminateOption {
    show: boolean,
    selectFieldName: string,
    detailsFieldName: string,
    updateAction: (name: string, newValue: any) => void,
    options: IOption[],
}
