import React from 'react';
import PrintSection from "../../../../components/CustomComponents/OrderPrint/PrintSection";
import {PrintOrderConnectedDate, PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";
import PropTypes from "prop-types";
import CustomDivider from "../../../../components/CustomComponents/CustomDivider";

export default class InvoicePrintSection extends React.Component {

    render() {
        return (
            <PrintSection title={this.props.sectionName}>
                <PrintOrderConnectedText name="proformaInvoiceNumber"/>
                <PrintOrderConnectedDate name="proformaInvoiceDate"/>
                <PrintOrderConnectedDate name="expectedPayDate"/>
                <PrintOrderConnectedText name="internalOrderNumber"/>

                <CustomDivider/>

                <PrintOrderConnectedText name="taxInvoiceNumber"/>
                <PrintOrderConnectedText name="taxInvoiceDate"/>
                <PrintOrderConnectedText name="receiptNumber"/>
                <PrintOrderConnectedText name="actualPayDay"/>
            </PrintSection>
        );
    }
}

InvoicePrintSection.propTypes = {
    sectionName: PropTypes.string,
};