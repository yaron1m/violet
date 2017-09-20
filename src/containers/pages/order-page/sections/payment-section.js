import React from 'react';
import CustomPaper from "../../../../components/custom-components/custom-paper";
import CustomText from "../../../../components/custom-components/custom-text-field";
import CustomDatePicker from "../../../../components/custom-components/custom-date-picker";
import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import Divider from 'material-ui/Divider';
import {getSelectedOrder, getSelectedOrganization} from "../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../store/required-fields/reducer";
import {isEmptyValue} from "../../../../util/string-util";


class OrganizationSection extends React.Component {

    calculatePayDate(proformaInvoiceValue) {
        if (isEmptyValue(this.props.selectedOrganization, "paymentConditions"))
            return;

        const proformaInvoiceDate = new Date(proformaInvoiceValue);
        const paymentConditions = this.props.selectedOrganization.paymentConditions;

        let paymentDate;
        switch (paymentConditions) {
            case this.props.paymentConditions["immediate"]:
                paymentDate = proformaInvoiceDate;
                break;

            case this.props.paymentConditions["EOM"]:
                paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 1, 1);
                break;

            case this.props.paymentConditions["EOM+30"]:
                paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 1);
                break;

            case this.props.paymentConditions["EOM+45"]:
                paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 15);
                break;

            case this.props.paymentConditions["EOM+60"]:
                paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 3, 1);
                break;

            case this.props.paymentConditions["EOM+30+7"]:
                paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 7);
                break;

            case this.props.paymentConditions["EOM+30+22"]:
                paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 22);
                break;

            default:
                console.error("Could not parse payment conditions - " + paymentConditions);
                return;
        }

        this.props.dispatch(updateSelectedOrder("expectedPayDate", paymentDate.toJSON()));
    }

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
                if (key === "proformaInvoiceDate")
                    this.calculatePayDate.bind(this)(value);
                this.props.dispatch(updateSelectedOrder(key, value));
            }.bind(this)
        };

        return (
            <CustomPaper
                title={this.props.labels.sectionName}
            >

                <div style={style.flex}>
                    <CustomText data={fieldData} name="amount"/>
                    <CustomText data={fieldData} name="proformaInvoiceNumber"/>
                    <CustomDatePicker data={fieldData} name="proformaInvoiceDate" size="L"/>
                    <CustomDatePicker data={fieldData} name="expectedPayDate"/>
                </div>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <div style={style.flex}>
                    <CustomText data={fieldData} name="taxInvoiceNumber"/>
                    <CustomDatePicker data={fieldData} name="taxInvoiceDate" size="L"/>
                    <CustomText data={fieldData} name="receiptNumber"/>
                    <CustomDatePicker data={fieldData} name="actualPayDay"/>
                </div>

            </CustomPaper>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.paymentSection,
        paymentConditions: getLabels(state).OrganizationPage.organizationSection.paymentConditions,
        selectedOrder: getSelectedOrder(state),
        selectedOrganization: getSelectedOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

export default connect(mapStateToProps)(OrganizationSection);