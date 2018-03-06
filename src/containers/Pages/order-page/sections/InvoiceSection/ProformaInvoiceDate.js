import React from 'react';
import Sizes from "../../../../../util/consts/sizes";
import OrderCustomDatePicker from "../ConnectedCustomComponents/OrderCustomDatePicker";

export default class ProformaInvoiceDate extends React.Component {

    render() {
        return (
            <OrderCustomDatePicker updateAction={this.props.updateAction} name="proformaInvoiceDate" size={Sizes.L}/>
        );
    }
}