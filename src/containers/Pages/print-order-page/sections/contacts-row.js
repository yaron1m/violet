import React from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import PrintField from "../../../../components/custom-components/order-print/print-field";
import {getKey} from "../../order-page/sections/contacts-section/ContactRow";

class ContactsPrintRow extends React.Component {
    render() {
        const fieldData = {
            titles: this.props.labels.contacts.titles,
            values: this.props.selectedOrder,
        };

        const isFinancial = this.props.isFinancial;

        return (
            <div>
                <div>
                    {isFinancial ? this.props.labels.payment.financialContactTitle : null}
                </div>

                <PrintField data={fieldData} name={getKey("contactFirstName", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactLastName", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactJob", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactPhone1", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactEmail", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactPhone2", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactPhoneExtension", isFinancial)}/>
                <PrintField data={fieldData} name={getKey("contactFax", isFinancial)}/>
            </div>
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

ContactsPrintRow.propTypes = {
    isFinancial: PropTypes.bool
};

export default connect(mapStateToProps)(ContactsPrintRow);