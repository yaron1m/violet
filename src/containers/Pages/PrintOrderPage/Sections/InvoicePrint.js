import React from 'react';
import PrintSection from "../../../../components/CustomComponents/OrderPrint/PrintSection";
import Divider from 'material-ui/Divider';
import {PrintOrderConnectedDate, PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";
import PropTypes from "prop-types";

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

InvoicePrintSection.propTypes = {
    sectionName: PropTypes.string,
};