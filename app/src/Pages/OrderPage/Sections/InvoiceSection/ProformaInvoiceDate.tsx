import React from "react";
import {Size} from "../../../../Util/Constants/Size";
import {OrderCustomDatePicker} from "../ConnectedCustomComponents/OrderCustomFields";
import {IStringObject} from "../../../../Interfaces/IOrder";

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
                    props.allPaymentConditions,
                );
            }}
        />
    );
}

interface ProformaInvoiceDate {
    onChangeProformaInvoiceDate: (value: string) => void;
    calculatePayDate: (proformaInvoiceValue: string, selectedPaymentConditions: string, allPaymentConditions: IStringObject) => void;
    selectedPaymentConditions: string;
    allPaymentConditions: IStringObject;
}
