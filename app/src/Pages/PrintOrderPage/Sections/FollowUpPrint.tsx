import React from "react";
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import {IOrder} from "@violet/common";
import PrintBoolean from "../../../Components/CustomComponents/OrderPrint/PrintBoolean";
import PrintDate from "../../../Components/CustomComponents/OrderPrint/PrintDate";
import PrintTextField from "../../../Components/CustomComponents/OrderPrint/PrintTextField";

export default function (props: { selectedOrder: IOrder }) {
    if (!props.selectedOrder.followUpRequired)
        return null;

    return (
        <PrintSection title="המשך טיפול">
            <PrintBoolean value={props.selectedOrder.followUpRequired} title="נדרש המשך טיפול"/>
            <PrintDate value={props.selectedOrder.followUpDate} title="תאריך המשך טיפול"/>
            <PrintTextField value={props.selectedOrder.followUpDetails} title="פרטי המשך טיפול"/>
        </PrintSection>
    );
}