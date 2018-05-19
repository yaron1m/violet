import React from 'react';
import PrintSection from "../../../../components/custom-components/OrderPrint/PrintSection";
import ContactsPrintRow from './ContactPrintRowContainer'
import PropTypes from "prop-types";

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

ContactsPrintSection.propTypes = {
    sectionName: PropTypes.string,
};