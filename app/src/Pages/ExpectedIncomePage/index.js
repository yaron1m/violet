import {connect} from 'react-redux';
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {getLabels} from "../../Store/Labels/Selectors";
import {getExpectedIncomeOrders} from "../../Store/Orders/Selectors.ts";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {Status} from "../../Util/Constants/Status";
import {Path} from "../Path";

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
            redirect(Path.form);
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
