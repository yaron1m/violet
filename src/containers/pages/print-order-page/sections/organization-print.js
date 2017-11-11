import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrganization} from "../../../../store/selected/reducer";
import PrintField from "../../../../components/custom-components/order-print/print-field";
import PrintSection from "../../../../components/custom-components/order-print/print-section";

class OrganizationPrintSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrganization,
        };

        return (
            <PrintSection title={this.props.labels.sectionName}>
                <PrintField data={fieldData} name="organizationName"/>
                <PrintField data={fieldData} name="organizationAddress"/>
                <PrintField data={fieldData} name="organizationCity" />
                <PrintField data={fieldData} name="organizationPostalCode" />
                <PrintField data={fieldData} name="companyId"/>
                <PrintField data={fieldData} name="paymentConditions"/>
                <PrintField data={fieldData} name="howReachedUs"/>
            </PrintSection>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.organization,
        selectedOrganization: getSelectedOrganization(state),
    };
}

export default connect(mapStateToProps)(OrganizationPrintSection);