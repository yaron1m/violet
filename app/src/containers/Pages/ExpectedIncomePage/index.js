import {connect} from 'react-redux';
import {selectOrder} from "../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../store/Labels/Selectors";
import {getExpectedIncomeOrders} from "../../../store/orders/selectors";
import {redirect} from "../../../util/HistoryUtil";
import CustomPaperTable from "../../../Components/Table/CustomPaperTable";
import Status from "../../../util/Constants/Status";

function mapStateToProps(state) {
    const acceptedStatuses = [Status.waitingPayment, Status.executed, Status.isExecuting, Status.approvedOrder];

    return {
        title: getLabels(state).pages.expectedIncome.table.title,
        tableHeaders: getLabels(state).pages.expectedIncome.table.tableHeaders,
        elements: getExpectedIncomeOrders(state, acceptedStatuses),
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
