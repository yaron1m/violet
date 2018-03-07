import React from 'react';
import Divider from 'material-ui/Divider';
import Sizes from "../../../../../util/consts/sizes";
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";
import {OrderCustomText, OrderCustomDatePicker} from "../ConnectedCustomComponents/OrderCustomFields";
import ProformaInvoiceDateContainer from "./ProformaInvoiceDateContainer";

export default class InvoiceSection extends React.Component {
    render() {
        const style = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            }
        };

        return (
            <CustomPaper
                title={this.props.sectionName}
            >
                <div style={style.flex}>
                    <OrderCustomText name="proformaInvoiceNumber"/>
                    <ProformaInvoiceDateContainer/>
                    <OrderCustomDatePicker name="expectedPayDate"/>
                    <OrderCustomText name="internalOrderNumber"/>
                </div>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <div style={style.flex}>
                    <OrderCustomText name="taxInvoiceNumber"/>
                    <OrderCustomDatePicker name="taxInvoiceDate" size={Sizes.L}/>
                    <OrderCustomText name="receiptNumber"/>
                    <OrderCustomDatePicker name="actualPayDay"/>
                </div>

            </CustomPaper>
        );
    }
}

InvoiceSection.propTypes = {
    sectionName: PropTypes.string.isRequired,
};
