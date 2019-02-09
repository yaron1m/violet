import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../Store/SelectedOrder/Actions";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import {getSelectedOrganization} from "../../../../Store/SelectedOrganization/Selectors";
import ProformaInvoiceDate from './ProformaInvoiceDate'
import calculatePayDate from "./ProformaInvoiceDateCalculator";
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        allPaymentConditions: getOrderSectionsLabels(state).organization.paymentConditions as string[],
        selectedPaymentConditions: getSelectedOrganization(state).paymentConditions,
    };
}

function mapDispatchToProps(dispatch :IDispatch) {
    return {
        updateSelectedOrder: (key: string, value: any) => dispatch(updateSelectedOrder(key, value)),
        calculatePayDate: function (proformaInvoiceValue:string, selectedPaymentConditions:string, allPaymentConditions:string[]) {
            const payDate = calculatePayDate(proformaInvoiceValue, selectedPaymentConditions, allPaymentConditions);
            if (payDate !== null)
                dispatch(updateSelectedOrder("expectedPayDate", payDate));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProformaInvoiceDate);