import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import Divider from 'material-ui/Divider';
import ContactRow from '../contacts-section/contact-row'
import CustomText from "../../../../../components/custom-components/custom-text-field";
import IconButton from "material-ui/IconButton";
import CalculateIcon from 'material-ui-icons/LocalAtm';
import Sizes from "../../../../../util/consts/sizes";
import AbstractOrderPageSection from "../AbstractOrderPageSection";

export default class PaymentSection extends AbstractOrderPageSection {

    render() {
        return (
            <CustomPaper
                title={this.props.sectionName}
            >
                <div>{this.props.financialContactTitle}</div>

                <ContactRow isFinancialContacts={true}/>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <div style={this.flexStyle}>
                    <IconButton
                        onClick={this.props.calculateSum}
                        tooltip={this.props.buttonTooltip}
                        style={{marginBottom: 10, marginRight: 10}}
                    >
                        <CalculateIcon/>
                    </IconButton>

                    <CustomText data={this.fieldData} name="cost" />
                    <CustomText data={this.fieldData} name="oneWayDistance" size={Sizes.M}/>
                    <CustomText data={this.fieldData} name="travelExpenses" size={Sizes.M}/>
                    <CustomText data={this.fieldData} name="extraCosts" size={Sizes.M}/>
                    <CustomText data={this.fieldData} name="sum"/>
                    <CustomText data={this.fieldData} name="vat" size={Sizes.M}/>
                    <CustomText data={this.fieldData} name="totalSum"/>
                </div>
            </CustomPaper>
        );
    }
}
