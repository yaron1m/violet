import React from "react";
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import CustomDivider from "../../../Components/CustomComponents/CustomDivider";
import PrintTextField from "../../../Components/CustomComponents/OrderPrint/PrintTextField";
import {IOrder} from "@violet/common";
import PrintBoolean from "../../../Components/CustomComponents/OrderPrint/PrintBoolean";

export default function (props: { selectedOrder: IOrder }) {
    return (
        <PrintSection title="חשבוניות">
             <PrintTextField value={props.selectedOrder.proformaInvoiceNumber} title="מספר חשבונית עסקה"/>
             <PrintTextField value={props.selectedOrder.proformaInvoiceDate} title="תאריך חשבונית עסקה"/>
             <PrintTextField value={props.selectedOrder.expectedPayDate} title="תאריך לתשלום"/>
             <PrintTextField value={props.selectedOrder.internalOrderNumber} title="מספר הזמנת רכש"/>
             <PrintBoolean value={props.selectedOrder.externalInvoiceSent} title="נשלחה חשבונית עסקה לחברה חיצונית"/>

            <CustomDivider/>

             <PrintTextField value={props.selectedOrder.taxInvoiceNumber} title="מספר חשבונית מס"/>
             <PrintTextField value={props.selectedOrder.taxInvoiceDate} title="תאריך חשבונית מס"/>
             <PrintTextField value={props.selectedOrder.receiptNumber} title="מספר קבלה"/>
        </PrintSection>
    );
}