import {connect} from 'react-redux';
import {selectOrder} from "../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../store/Labels/Selectors";
import {getExpectedIncomeOrders} from "../../../store/orders/selectors";
import {redirect} from "../../../util/HistoryUtil";
import CustomPaperTable from "../../../Components/Table/CustomPaperTable";
import {Status} from "../../../util/Constants/Status";

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
