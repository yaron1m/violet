import React from 'react';
import CustomPaper from "../../../../../Components/CustomComponents/CustomPaper";
import ContactRowContainer from '../ContactSection/ContactRowContainer'
import CalculateIcon from '@material-ui/icons/LocalAtm';
import {Sizes} from "../../../../../util/Constants/Sizes";
import PropTypes from "prop-types";
import {OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";
import CustomDivider from "../../../../../Components/CustomComponents/CustomDivider";
import {CustomIconButton} from "../../../../../Components/CustomComponents/CustomButtons";

export default class PaymentSection extends React.Component {

    render() {
        return (
            <CustomPaper
                title={this.props.sectionName}
            >
                <div>{this.props.financialContactTitle}</div>

                <ContactRowContainer isFinancialContacts={true}/>

                <CustomDivider/>

                <div>
                    <CustomIconButton
                        onClick={this.props.calculateSum}
                        tooltip={this.props.buttonTooltip}
                        style={{marginBottom: 10, marginLeft: 10}}
                    >
                        <CalculateIcon/>
                    </CustomIconButton>

                    <OrderCustomText name="cost"/>
                    <OrderCustomText name="oneWayDistance" size={Sizes.M}/>
                    <OrderCustomText name="travelExpenses" size={Sizes.M}/>
                    <OrderCustomText name="extraCosts" size={Sizes.M}/>
                    <OrderCustomText name="sum"/>
                    <OrderCustomText name="vat" size={Sizes.M}/>
                    <OrderCustomText name="totalSum"/>
                </div>
            </CustomPaper>
        );
    }
}

PaymentSection.propTypes = {
    sectionName: PropTypes.string.isRequired,
    calculateSum: PropTypes.func.isRequired,
    financialContactTitle: PropTypes.string,
    buttonTooltip: PropTypes.string,
};
