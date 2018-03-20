import React from 'react';
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import Divider from 'material-ui/Divider';
import {PrintOrderConnectedDate, PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";

export default class InvoicePrintSection extends React.Component {

    render() {
        return (
            <PrintSection title={this.props.sectionName}>
                <PrintOrderConnectedText name="proformaInvoiceNumber"/>
                <PrintOrderConnectedDate name="proformaInvoiceDate"/>
                <PrintOrderConnectedDate name="expectedPayDate"/>
                <PrintOrderConnectedText name="internalOrderNumber"/>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <PrintOrderConnectedText name="taxInvoiceNumber"/>
                <PrintOrderConnectedText name="taxInvoiceDate"/>
                <PrintOrderConnectedText name="receiptNumber"/>
                <PrintOrderConnectedText name="actualPayDay"/>
            </PrintSection>
        );
    }
}
