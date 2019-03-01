import {connect} from "react-redux";
import {updateSelectedOrder} from "../../../../Store/SelectedOrder/Actions";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import {getSelectedOrganization} from "../../../../Store/SelectedOrganization/Selectors";
import ProformaInvoiceDate from "./ProformaInvoiceDate";
import calculatePayDate from "./ProformaInvoiceDateCalculator";
import {IDispatch, IState} from "../../../../Interfaces/ReduxInterfaces";
import {IStringObject} from "../../../../Interfaces/IOrder";

function mapStateToProps(state: IState) {
    return {
        selectedPaymentConditions: getSelectedOrganization(state).paymentConditions,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onChangeProformaInvoiceDate: (value: string) => dispatch(updateSelectedOrder("proformaInvoiceDate", value)),
        updateSelectedOrder: (key: string, value: any) => dispatch(updateSelectedOrder(key, value)),
        calculatePayDate: function (proformaInvoiceValue: string, selectedPaymentConditions: string) {
            const payDate = calculatePayDate(proformaInvoiceValue, selectedPaymentConditions);
            if (payDate !== null)
                dispatch(updateSelectedOrder("expectedPayDate", payDate));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProformaInvoiceDate);