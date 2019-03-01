import {connect} from "react-redux";
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {getExpectedIncomeOrders, IExpectedIncomeOrderSummary} from "../../Store/Orders/Selectors";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {Status} from "../../Util/Constants/Status";
import {Path} from "../Path";
import {IDispatch, IState} from "../../Interfaces/ReduxInterfaces";
import {IStringObject} from "../../Interfaces/IOrder";

function mapStateToProps(state: IState) {
    return {
        title: "הזמנות ממתינות לתשלום",
        elements: getExpectedIncomeOrders(state, Status.waitingPayment),
        tableHeaders: [
            {orderId: "מספר הזמנה"},
            {organizationName: "שם הארגון"},
            {lectureDate: "תאריך הרצאה"},
            {proformaInvoiceNumber: "חשבונית עסקה"},
            {expectedPayDate: "תאריך תשלום"},
            {totalSum: "סכום לתשלום"},
            {edit: "עריכה"}
        ] as IStringObject[],
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