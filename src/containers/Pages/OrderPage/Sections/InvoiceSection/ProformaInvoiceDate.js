import React from 'react';
import Sizes from "../../../../../util/consts/sizes";
import PropTypes from "prop-types";
import {OrderCustomDatePicker} from "../ConnectedCustomComponents/OrderCustomFields";

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
