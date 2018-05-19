import React from 'react';
import CustomPaper from "../../../../../components/CustomComponents/CustomPaper";
import ContactRowContainer from '../ContactSection/ContactRowContainer'
import IconButton from "material-ui/IconButton";
import CalculateIcon from 'material-ui-icons/LocalAtm';
import Sizes from "../../../../../util/consts/sizes";
import PropTypes from "prop-types";
import {OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";
import CustomDivider from "../../../../../components/CustomComponents/CustomDivider";

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
                    <IconButton
                        onClick={this.props.calculateSum}
                        tooltip={this.props.buttonTooltip}
                        style={{marginBottom: 10, marginRight: 10}}
                    >
                        <CalculateIcon/>
                    </IconButton>

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
