import React from 'react';
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import {PrintOrganizationConnectedText} from "./ConnectedCustomComponents/PrintOrganizationConnectedFields";
import PropTypes from "prop-types";

export default class OrganizationPrintSection extends React.Component {

    render() {
        return (
            <PrintSection title={this.props.sectionName}>
                <PrintOrganizationConnectedText name="organizationName"/>
                <PrintOrganizationConnectedText name="organizationAddress"/>
                <PrintOrganizationConnectedText name="organizationCity" />
                <PrintOrganizationConnectedText name="organizationPostalCode" />
                <PrintOrganizationConnectedText name="companyId"/>
                <PrintOrganizationConnectedText name="paymentConditions"/>
                <PrintOrganizationConnectedText name="howReachedUs"/>
            </PrintSection>
        );
    }
}

OrganizationPrintSection.propTypes = {
    sectionName: PropTypes.string,
};