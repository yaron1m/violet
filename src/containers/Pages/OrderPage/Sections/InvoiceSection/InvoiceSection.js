import React from 'react';
import Sizes from "../../../../../util/Constants/Sizes";
import CustomPaper from "../../../../../components/CustomComponents/CustomPaper";
import PropTypes from "prop-types";
import {OrderCustomText, OrderCustomDatePicker} from "../ConnectedCustomComponents/OrderCustomFields";
import ProformaInvoiceDateContainer from "./ProformaInvoiceDateContainer";
import CustomDivider from "../../../../../components/CustomComponents/CustomDivider";

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

                <CustomDivider/>

                <div style={style.flex}>
                    <OrderCustomText name="taxInvoiceNumber"/>
                    <OrderCustomDatePicker name="taxInvoiceDate" size={Sizes.L}/>
                    <OrderCustomText name="receiptNumber"/>
                </div>

            </CustomPaper>
        );
    }
}

InvoiceSection.propTypes = {
    sectionName: PropTypes.string.isRequired,
};
