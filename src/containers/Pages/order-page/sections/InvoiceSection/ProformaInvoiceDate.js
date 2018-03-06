import React from 'react';
import Sizes from "../../../../../util/consts/sizes";
import OrderCustomDatePicker from "../ConnectedCustomComponents/OrderCustomDatePicker";
import PropTypes from "prop-types";

export default class ProformaInvoiceDate extends React.Component {

    render() {
        return (
            <OrderCustomDatePicker updateAction={this.props.updateAction} name="proformaInvoiceDate" size={Sizes.L}/>
        );
    }
}

ProformaInvoiceDate.propTypes = {
    updateAction: PropTypes.func.isRequired,
};
