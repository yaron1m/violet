import React from 'react';
import {Size} from "../../../../Util/Constants/Size";
import CustomPaper, {flexStyle} from "../../../../Components/CustomComponents/CustomPaper";
import {OrderCustomDatePicker, OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";
import ProformaInvoiceDateContainer from "./ProformaInvoiceDateContainer";
import CustomDivider from "../../../../Components/CustomComponents/CustomDivider";

export default function InvoiceSection(props: { sectionName: string }) {
    return (
        <CustomPaper
            title={props.sectionName}
        >
            <div style={flexStyle}>
                <OrderCustomText name="proformaInvoiceNumber"/>
                <ProformaInvoiceDateContainer/>
                <OrderCustomDatePicker name="expectedPayDate"/>
                <OrderCustomText name="internalOrderNumber"/>
            </div>

            <CustomDivider/>

            <div style={flexStyle}>
                <OrderCustomText name="taxInvoiceNumber"/>
                <OrderCustomDatePicker name="taxInvoiceDate" size={Size.L}/>
                <OrderCustomText name="receiptNumber"/>
            </div>

        </CustomPaper>
    );
}