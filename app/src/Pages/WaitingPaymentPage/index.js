import {connect} from 'react-redux';
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {getLabels} from "../../Store/Labels/Selectors";
import {getExpectedIncomeOrders} from "../../Store/Orders/Selectors";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {Status} from "../../Util/Constants/Status";
import {Path} from "../Path";

function mapStateToProps(state: IState) {
    return {
        title: getLabels(state).pages.paymentPage.table.title,
        tableHeaders: getLabels(state).pages.paymentPage.table.tableHeaders,
        elements: getExpectedIncomeOrders(state, Status.waitingPayment),
    };
}

function mapDispatchToProps(dispatch :IDispatch) {
    return {
        onEditButton: (orderId) => {
            dispatch(selectOrder(orderId));
            redirect(Path.order);
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
