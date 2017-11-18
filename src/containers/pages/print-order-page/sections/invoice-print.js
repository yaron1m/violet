import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import PrintField from "../../../../components/custom-components/order-print/print-field";
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import PrintDate from "../../../../components/custom-components/order-print/print-date";
import Divider from 'material-ui/Divider';

class InvoicePrintSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
        };

        //TODO print new payment section
        return (
            <PrintSection title={this.props.labels.sectionName}>
                {/*<PrintField data={fieldData} name="totalSum"/>*/}
                <PrintField data={fieldData} name="proformaInvoiceNumber"/>
                <PrintDate data={fieldData} name="proformaInvoiceDate"/>
                <PrintDate data={fieldData} name="expectedPayDate"/>
                <PrintField data={fieldData} name="internalOrderNumber"/>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <PrintField data={fieldData} name="taxInvoiceNumber"/>
                <PrintDate data={fieldData} name="taxInvoiceDate"/>
                <PrintField data={fieldData} name="receiptNumber"/>
                <PrintDate data={fieldData} name="actualPayDay"/>
            </PrintSection>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.invoice,
        selectedOrder: getSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(InvoicePrintSection);