import React from 'react';
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import {PrintOrderConnectedDate, PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";
import CustomDivider from "../../../Components/CustomComponents/CustomDivider";

export default function (props: { sectionName: string }) {
    return (
        <PrintSection title={props.sectionName}>
            <PrintOrderConnectedText name="proformaInvoiceNumber"/>
            <PrintOrderConnectedDate name="proformaInvoiceDate"/>
            <PrintOrderConnectedDate name="expectedPayDate"/>
            <PrintOrderConnectedText name="internalOrderNumber"/>

            <CustomDivider/>

            <PrintOrderConnectedText name="taxInvoiceNumber"/>
            <PrintOrderConnectedText name="taxInvoiceDate"/>
            <PrintOrderConnectedText name="receiptNumber"/>
        </PrintSection>
    );
}