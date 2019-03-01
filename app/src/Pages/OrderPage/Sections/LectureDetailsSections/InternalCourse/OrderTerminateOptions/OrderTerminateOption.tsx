import React from "react";
import {Size} from "../../../../../../Util/Constants/Size";
import {OrderCustomSelectField, OrderCustomText} from "../../../ConnectedCustomComponents/OrderCustomFields";
import {IOption} from "../../../../../../Components/CustomComponents/CustomSelectField";

export default function OrderTerminateOption(props: OrderTerminateOption) {
    if (!props.show)
        return null;

    return (
        <div style={{display: "flex"}}>
            <OrderCustomSelectField
                name={props.selectFieldName}
                options={props.options}
                size={Size.XL}
                onChange={props.onSelectFieldChange}
                title={props.selectFieldTitle}
            />
            <OrderCustomText title={props.detailsFieldTitle} name={props.detailsFieldName} fullWidth={true}/>
        </div>
    );
}

interface OrderTerminateOption {
    show: boolean,
    detailsFieldTitle: string,
    selectFieldTitle: string,
    selectFieldName: "cancellationReason" | "rejectionReason",
    detailsFieldName: "cancellationDetails" | "rejectionDetails",
    onSelectFieldChange: (newValue: string) => void,
    options: IOption[],
}
