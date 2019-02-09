/* eslint-disable no-magic-numbers */
import {isEmpty} from "../../../../../Util/StringUtil";
import {toDateFormat} from "../../../../../Util/TimeUtil";

export default function calculatePayDate(proformaInvoiceValue, selectedPaymentConditions, allPaymentConditions) {
    if (isEmpty(selectedPaymentConditions) || isEmpty(proformaInvoiceValue))
        return null;

    const proformaInvoiceDate = new Date(proformaInvoiceValue);

    let paymentDate;
    switch (selectedPaymentConditions) {
        case allPaymentConditions["immediate"]:
            paymentDate = proformaInvoiceDate;
            break;

        case allPaymentConditions["EOM"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 1, 1);
            break;

        case allPaymentConditions["EOM+30"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 1);
            break;

        case allPaymentConditions["EOM+45"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 15);
            break;

        case allPaymentConditions["EOM+60"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 3, 1);
            break;

        case allPaymentConditions["EOM+30+7"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 7);
            break;

        case allPaymentConditions["EOM+30+22"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 22);
            break;

        default:
            return null;
    }

    return toDateFormat(paymentDate);
}
