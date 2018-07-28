import React from 'react';
import PrintSection from "../../../../components/CustomComponents/OrderPrint/PrintSection";
import ContactsPrintRow from './ContactPrintRowContainer'
import {PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";
import PropTypes from "prop-types";
import CustomDivider from "../../../../components/CustomComponents/CustomDivider";

export default class ContactsPrintSection extends React.Component {
    render() {
        return (
            <PrintSection
                title={this.props.sectionName}
            >
                <ContactsPrintRow isFinancial={true}/>

                <CustomDivider/>

                <PrintOrderConnectedText name="cost"/>
                <PrintOrderConnectedText name="oneWayDistance"/>
                <PrintOrderConnectedText name="travelExpenses"/>
                <PrintOrderConnectedText name="extraCosts"/>
                <PrintOrderConnectedText name="sum"/>
                <PrintOrderConnectedText name="vat"/>
                <PrintOrderConnectedText name="totalSum"/>
            </PrintSection>
        );
    }
}

ContactsPrintSection.propTypes = {
    sectionName: PropTypes.string,
};