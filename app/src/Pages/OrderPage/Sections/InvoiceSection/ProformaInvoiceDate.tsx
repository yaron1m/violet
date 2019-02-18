import React from "react";
import {Size} from "../../../../Util/Constants/Size";
import PropTypes from "prop-types";
import {OrderCustomDatePicker} from "../ConnectedCustomComponents/OrderCustomFields";
import {IStringObject} from '../../../../Interfaces/IOrder';

export default function ProformaInvoiceDate(props: ProformaInvoiceDate) {
    return (
        <OrderCustomDatePicker
            name="proformaInvoiceDate" size={Size.L}

            updateAction={(key: string, value: any) => {
                props.updateSelectedOrder(key, value);

                props.calculatePayDate(
                    value,
                    props.selectedPaymentConditions,
                    props.allPaymentConditions,
                );
            }}
        />
    );
}

interface ProformaInvoiceDate {
    updateSelectedOrder: (key: string, value: any) => void;
    calculatePayDate: (proformaInvoiceValue: string, selectedPaymentConditions: string, allPaymentConditions: IStringObject) => void;
    selectedPaymentConditions: string;
    allPaymentConditions: IStringObject;
}
