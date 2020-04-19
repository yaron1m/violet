/* eslint-disable no-magic-numbers */
import {isEmpty} from "../../../../Util/StringUtil";
import {toDateFormat} from "@violet/common";
import {PaymentCondition, paymentConditionLabels} from "../../../../Util/Constants/PaymentCondition";

export default function calculatePayDate(proformaInvoiceValue: string, selectedPaymentConditions: string) {
    if (isEmpty(selectedPaymentConditions) || isEmpty(proformaInvoiceValue))
        return null;

    const proformaInvoiceDate = new Date(proformaInvoiceValue);

    let paymentDate;
    switch (selectedPaymentConditions) {
        case paymentConditionLabels[PaymentCondition.Immediate]:
            paymentDate = proformaInvoiceDate;
            break;

        case paymentConditionLabels[PaymentCondition.EndOfTheMonth]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 1, 1);
            break;

        case paymentConditionLabels[PaymentCondition.EndOfTheMonthPlus30]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 1);
            break;

        case paymentConditionLabels[PaymentCondition.EndOfTheMonthPlus45]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 15);
            break;

        case paymentConditionLabels[PaymentCondition.EndOfTheMonthPlus60]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 3, 1);
            break;

        case paymentConditionLabels[PaymentCondition.EndOfTheMonthPlus30plus7]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 7);
            break;

        case paymentConditionLabels[PaymentCondition.EndOfTheMonthPlus30plus22]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 22);
            break;

        default:
            return null;
    }

    return toDateFormat(paymentDate);
}
