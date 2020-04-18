import {connect} from "react-redux";
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {getExpectedIncomeOrders, IExpectedIncomeOrderSummary} from "../../Store/Orders/Selectors";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {Status} from "../../Util/Constants/Status";
import {Path} from "../Path";
import {IDispatch, IState} from "../../Interfaces/ReduxInterfaces";
import {IStringObject} from "@violet/common";

function mapStateToProps(state: IState) {
    const acceptedStatuses = [Status.waitingPayment, Status.executed, Status.isExecuting, Status.approvedOrder];

    return {
        title: "הזמנות מאושרות",
        elements: getExpectedIncomeOrders(state, acceptedStatuses),
        tableHeaders: [
            {orderId: "מספר הזמנה"},
            {organizationName: "שם הארגון"},
            {lectureDate: "תאריך הרצאה"},
            {topic: "נושא"},
            {status: "סטאטוס"},
            {expectedPayDate: "תאריך תשלום"},
            {totalSum: "סכום לתשלום"}
        ] as IStringObject[]
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
