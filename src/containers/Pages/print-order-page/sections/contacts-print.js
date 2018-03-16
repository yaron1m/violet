import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import ContactsPrintRow from './ContactPrintRowContainer'

class ContactsPrintSection extends React.Component {
    render() {
        return (
            <PrintSection
                title={this.props.labels.sectionName}
            >
                <ContactsPrintRow isFinancial={false}/>
            </PrintSection>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.contacts,
    };
}

export default connect(mapStateToProps)(ContactsPrintSection);