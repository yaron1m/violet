import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import Divider from 'material-ui/Divider';
import {getSelectedOrder, getSelectedOrganization} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import ContactRow from '../contacts-section/contact-row'
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import CustomText from "../../../../../components/custom-components/custom-text-field";
import IconButton from "material-ui/IconButton";
import CaluculateIcon from 'material-ui-icons/LocalAtm';
import Sizes from "../../../../../util/consts/sizes";

class PaymentSection extends React.Component {
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
                <div>{this.props.labels.financialContactTitle}</div>
                <ContactRow isFinancialContacts={true}/>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <div style={style.flex}>
                    <IconButton
                        // onClick={this.openContactImportDialog.bind(this)}
                        tooltip={this.props.labels.buttonTooltip}
                        style={{marginBottom: 10, marginRight: 10}}
                    >
                        <CaluculateIcon/>
                    </IconButton>

                    <CustomText data={fieldData} name="cost" />
                    <CustomText data={fieldData} name="oneWayDistance" size={Sizes.M}/>
                    <CustomText data={fieldData} name="travelExpenses" size={Sizes.M}/>
                    <CustomText data={fieldData} name="extraCosts" size={Sizes.M}/>
                    <CustomText data={fieldData} name="sum"/>
                    <CustomText data={fieldData} name="VAT" size={Sizes.M}/>
                    <CustomText data={fieldData} name="totalSum"/>
                </div>
            </CustomPaper>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.payment,
        paymentConditions: getLabels(state).pages.orderPage.sections.organization.paymentConditions,
        selectedOrder: getSelectedOrder(state),
        selectedOrganization: getSelectedOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

export default connect(mapStateToProps)(PaymentSection);