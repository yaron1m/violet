import {connect} from 'react-redux';
import {selectOrder} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getExpectedIncomeOrders} from "../../../store/orders/selectors";
import {redirect} from "../../../util/history-util";
import CustomPaperTable from "../../../components/tables/custom-paper-table";
import Status from "../../../util/consts/status";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.paymentPage.table.title,
        tableHeaders: getLabels(state).pages.paymentPage.table.tableHeaders,
        elements: getExpectedIncomeOrders(state, Status.waitingPayment),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onEditButton: (orderId) => {
            dispatch(selectOrder(orderId));
            redirect('/form');
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
