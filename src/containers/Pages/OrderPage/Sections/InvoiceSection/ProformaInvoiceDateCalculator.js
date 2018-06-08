/* eslint-disable no-magic-numbers */
import {isEmptyValue} from "../../../../../util/StringUtil";
import {toDateFormat} from "../../../../../util/TimeUtil";

export default function calculatePayDate(proformaInvoiceValue, selectedOrganization, paymentConditions) {
    if (isEmptyValue(selectedOrganization, "paymentConditions"))
        return;

    // TODO test this function

    const proformaInvoiceDate = new Date(proformaInvoiceValue);
    const selectedPaymentConditions = selectedOrganization.paymentConditions;

    let paymentDate;
    switch (selectedPaymentConditions) {
        case paymentConditions["immediate"]:
            paymentDate = proformaInvoiceDate;
            break;

        case paymentConditions["EOM"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 1, 1);
            break;

        case paymentConditions["EOM+30"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 1);
            break;

        case paymentConditions["EOM+45"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 15);
            break;

        case paymentConditions["EOM+60"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 3, 1);
            break;

        case paymentConditions["EOM+30+7"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 7);
            break;

        case paymentConditions["EOM+30+22"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 22);
            break;

        default:
            return;
    }

    return toDateFormat(paymentDate);
}
