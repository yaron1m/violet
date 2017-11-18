import React from 'react';
import CustomText from "../../../../../components/custom-components/custom-text-field";
import CustomDatePicker from "../../../../../components/custom-components/custom-date-picker";
import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import Divider from 'material-ui/Divider';
import {getSelectedOrder, getSelectedOrganization} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import ProformaInvoiceDate from "./proforma-invoice-date";
import Sizes from "../../../../../util/consts/sizes";
import CustomPaper from "../../../../../components/custom-components/custom-paper";


class InvoiceData extends React.Component {
    render() {
        const style = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            }
        };

        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
            requiredFields: this.props.requiredFields,
            updateAction: function (key, value) {
                this.props.dispatch(updateSelectedOrder(key, value));
            }.bind(this)
        };

        return (
            <CustomPaper
                title={this.props.labels.sectionName}
            >
                <div style={style.flex}>
                    <CustomText data={fieldData} name="proformaInvoiceNumber"/>
                    <ProformaInvoiceDate/>
                    <CustomDatePicker data={fieldData} name="expectedPayDate"/>
                    <CustomText data={fieldData} name="internalOrderNumber"/>
                </div>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <div style={style.flex}>
                    <CustomText data={fieldData} name="taxInvoiceNumber"/>
                    <CustomDatePicker data={fieldData} name="taxInvoiceDate" size={Sizes.L}/>
                    <CustomText data={fieldData} name="receiptNumber"/>
                    <CustomDatePicker data={fieldData} name="actualPayDay"/>
                </div>

            </CustomPaper>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.invoice,
        paymentConditions: getLabels(state).pages.orderPage.sections.organization.paymentConditions,
        selectedOrder: getSelectedOrder(state),
        selectedOrganization: getSelectedOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

export default connect(mapStateToProps)(InvoiceData);