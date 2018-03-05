import React from 'react';
import CustomText from "../../../../../components/custom-components/custom-text-field";
import CustomDatePicker from "../../../../../components/custom-components/custom-date-picker";
import Divider from 'material-ui/Divider';
import ProformaInvoiceDate from "./proforma-invoice-date";
import Sizes from "../../../../../util/consts/sizes";
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";

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

        const props = {
            titles: this.props.titles,
            values: this.props.values,
            requiredFields: this.props.requiredFields,
            updateAction: this.props.updateAction,
        };

        return (
            <CustomPaper
                title={this.props.sectionName}
            >
                <div style={style.flex}>
                    <CustomText data={props} name="proformaInvoiceNumber"/>
                    <ProformaInvoiceDate/>
                    <CustomDatePicker data={props} name="expectedPayDate"/>
                    <CustomText data={props} name="internalOrderNumber"/>
                </div>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <div style={style.flex}>
                    <CustomText data={props} name="taxInvoiceNumber"/>
                    <CustomDatePicker data={props} name="taxInvoiceDate" size={Sizes.L}/>
                    <CustomText data={props} name="receiptNumber"/>
                    <CustomDatePicker data={props} name="actualPayDay"/>
                </div>

            </CustomPaper>
        );
    }
}


InvoiceSection.propTypes = {
    sectionName: PropTypes.string,
    titles: PropTypes.object,
    values: PropTypes.object,
    requiredFields: PropTypes.array,
    updateAction: PropTypes.func,
};
