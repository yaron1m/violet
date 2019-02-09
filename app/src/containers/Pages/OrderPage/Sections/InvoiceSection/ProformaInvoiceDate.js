import React from 'react';
import {Sizes} from "../../../../../Util/Constants/Sizes";
import PropTypes from "prop-types";
import {OrderCustomDatePicker} from "../ConnectedCustomComponents/OrderCustomFields";

export default class ProformaInvoiceDate extends React.Component {

    render() {
        return (
            <OrderCustomDatePicker
                name="proformaInvoiceDate" size={Sizes.L}

                updateAction={(key, value) => {
                    this.props.updateSelectedOrder(key, value);

                    this.props.calculatePayDate(
                        value,
                        this.props.selectedPaymentConditions,
                        this.props.allPaymentConditions,
                    );
                }}
            />
        );
    }
}

ProformaInvoiceDate.propTypes = {
    updateSelectedOrder: PropTypes.func.isRequired,
    calculatePayDate: PropTypes.func.isRequired,
    selectedPaymentConditions: PropTypes.string,
    allPaymentConditions: PropTypes.object.isRequired,
};
