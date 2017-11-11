import React from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import PrintField from "../../../../components/custom-components/order-print/print-field";
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import {getKey} from "../../order-page/sections/contacts-section/contact-row";

class ContactsPrintSection extends React.Component {
    render() {
        const fieldData = {
            titles: this.props.labels.contacts.titles,
            values: this.props.selectedOrder,
        };

        const isFinancial = this.props.isFinancial;

        return (
            <PrintSection
                title={isFinancial ? this.props.labels.payment.financialContactTitle : this.props.labels.contacts.sectionName}
            >
                <PrintField data={fieldData} name={getKey("contactFirstName", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactLastName", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactJob", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactPhone1", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactEmail", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactPhone2", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactPhoneExtension", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactFax", isFinancial)}/>
            </PrintSection>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        labels: getLabels(state).pages.orderPage.sections,
        selectedOrder: getSelectedOrder(state),
        isFinancial: ownProps.isFinancial
    };
}

ContactsPrintSection.propTypes = {
    isFinancial: PropTypes.bool
};

export default connect(mapStateToProps)(ContactsPrintSection);