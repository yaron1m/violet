import {connect} from "react-redux";
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {getActionRequiredOrders} from "../../Store/Orders/Selectors";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {IDispatch, IState} from "../../Interfaces/ReduxInterfaces";
import {Path} from "../Path";
import {IActionRequiredOrder} from "../../Store/Orders/ActionRequiredOrderes";
import {IStringObject} from "../../Interfaces/IOrder";

function mapStateToProps(state: IState) {
    return {
        title: "הזמנות שדורשות פעולה",
        elements: getActionRequiredOrders(state),
        tableHeaders: [
            {orderId: "מספר הזמנה"},
            {createdDate: "תאריך יצירת הזמנה"},
            {organizationName: "שם הארגון"},
            {status: "סטאטוס הזמנה"},
            {issue: "בעיה"},
            {edit: "עריכה"}
        ] as IStringObject[],
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (orderSummary: IActionRequiredOrder) => {
            dispatch(selectOrder(orderSummary.orderId));
            redirect(Path.order);
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
