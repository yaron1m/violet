import React from "react";
import {Size} from "../../../../Util/Constants/Size";
import {OrderCustomDatePicker} from "../ConnectedCustomComponents/OrderCustomFields";

export default function ProformaInvoiceDate(props: ProformaInvoiceDate) {
    return (
        <OrderCustomDatePicker
            title="תאריך חשבונית עסקה"
            name="proformaInvoiceDate"
            size={Size.L}
            onChange={(value: string) => {
                props.onChangeProformaInvoiceDate(value);

                props.calculatePayDate(
                    value,
                    props.selectedPaymentConditions,
                );
            }}
        />
    );
}

interface ProformaInvoiceDate {
    onChangeProformaInvoiceDate: (value: string) => void;
    calculatePayDate: (proformaInvoiceValue: string, selectedPaymentConditions: string) => void;
    selectedPaymentConditions: string;
}
