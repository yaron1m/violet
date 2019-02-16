import {connect} from 'react-redux';
import {selectOrder} from '../../Store/SelectedOrder/Actions';
import {getLabels} from '../../Store/Labels/Selectors';
import {IExpectedIncomeOrderSummary, getExpectedIncomeOrders} from '../../Store/Orders/Selectors';
import {redirect} from '../../Util/HistoryUtil';
import CustomPaperTable from '../../Components/Table/CustomPaperTable';
import {Status} from '../../Util/Constants/Status';
import {Path} from '../Path';
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    const acceptedStatuses = [Status.waitingPayment, Status.executed, Status.isExecuting, Status.approvedOrder];

    return {
        title: getLabels(state).pages.expectedIncome.table.title,
        tableHeaders: getLabels(state).pages.expectedIncome.table.tableHeaders,
        elements: getExpectedIncomeOrders(state, acceptedStatuses),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (summary: IExpectedIncomeOrderSummary) => {
            dispatch(selectOrder(summary.orderId));
            redirect(Path.order);
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
