import {connect} from "react-redux";
import {clearSelectedOrder, selectOrder} from "../../Store/SelectedOrder/Actions";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {getOrdersByOrganization, getOrdersSummary, IOrderSummary} from "../../Store/Orders/Selectors";
import {isSelectedOrganization} from "../../Store/SelectedOrganization/Selectors";
import {Path} from "../Path";
import {IDispatch, IState} from "../../Interfaces/ReduxInterfaces";
import {IStringObject} from "../../Interfaces/IOrder";

function mapStateToProps(state: IState) {
    return {
        title: "הזמנות",
        elements: getOrdersSummary(state, getOrdersByOrganization).reverse(),

        singleCellRow: isSelectedOrganization(state),
        singleCellRowText: "הוסף הזמנה חדשה",

        tableHeaders: [
            {orderId: "מספר הזמנה"},
            {date: "תאריך הרצאה"},
            {topic: "נושא"},
            {status: "סטאטוס"},
            {proformaInvoiceNumber: "חשבונית עסקה"},
            {edit: "עריכה"}
        ] as IStringObject[]
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (summary: IOrderSummary) => {
            dispatch(selectOrder(summary.orderId));
            redirect(Path.order);
        },
        singleCellRowOnClick: () => {
            dispatch(clearSelectedOrder());
            redirect(Path.order);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
