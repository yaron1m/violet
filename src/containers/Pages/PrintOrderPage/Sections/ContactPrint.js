import React from 'react';
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import ContactsPrintRow from './ContactPrintRowContainer'

export default class ContactsPrintSection extends React.Component {
    render() {
        return (
            <PrintSection
                title={this.props.sectionName}
            >
                <ContactsPrintRow isFinancial={false}/>
            </PrintSection>
        );
    }
}
