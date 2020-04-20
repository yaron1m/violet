import React from "react";
import {Size} from "../../../../Util/Constants/Size";
import CustomPaper, {flexStyle} from "../../../../Components/CustomComponents/CustomPaper";
import {
    OrderCustomDatePicker,
    OrderCustomText,
    OrderCustomToggle
} from "../ConnectedCustomComponents/OrderCustomFields";
import ProformaInvoiceDateContainer from "./ProformaInvoiceDateContainer";
import CustomDivider from "../../../../Components/CustomComponents/CustomDivider";

export default function InvoiceSection() {
    return (
        <CustomPaper title="תשלום">
            <div style={flexStyle}>
                <OrderCustomText title="מספר חשבונית עסקה" name="proformaInvoiceNumber"/>
                <ProformaInvoiceDateContainer/>
                <OrderCustomDatePicker title="תאריך לתשלום" name="expectedPayDate"/>
                <OrderCustomText title="מספר הזמנת רכש" name="internalOrderNumber"/>
                <OrderCustomToggle title="נשלחה חשבונית עסקה לחברה חיצונית" name="externalInvoiceSent"/>
            </div>

            <CustomDivider/>

            <div style={flexStyle}>
                <OrderCustomText title="מספר חשבונית מס" name="taxInvoiceNumber"/>
                <OrderCustomDatePicker title="תאריך חשבונית מס" name="taxInvoiceDate" size={Size.L}/>
                <OrderCustomText title="מספר קבלה" name="receiptNumber"/>
            </div>

        </CustomPaper>
    );
}