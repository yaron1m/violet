import React from 'react';
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import {PrintOrganizationConnectedText} from "./ConnectedCustomComponents/PrintOrganizationConnectedFields";

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
