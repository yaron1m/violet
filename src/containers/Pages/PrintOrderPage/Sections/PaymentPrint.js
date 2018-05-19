import React from 'react';
import PrintSection from "../../../../components/custom-components/OrderPrint/PrintSection";
import ContactsPrintRow from './ContactPrintRowContainer'
import Divider from 'material-ui/Divider';
import {PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";
import PropTypes from "prop-types";

export default class ContactsPrintSection extends React.Component {
    render() {
        return (
            <PrintSection
                title={this.props.sectionName}
            >
                <ContactsPrintRow isFinancial={true}/>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

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