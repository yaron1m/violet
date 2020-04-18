import {connect} from "react-redux";
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {getOrders, getOrdersSummary, IOrderSummary} from "../../Store/Orders/Selectors";
import * as _ from "lodash";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {IDispatch, IState} from "../../Interfaces/ReduxInterfaces";
import * as React from "react";
import {Status} from "../../Util/Constants/Status";
import {Path} from "../Path";
import {IStringObject} from "@violet/common";

export function getElements(state: IState, ownProps: AllOrdersTableContainerProps) {
    return _.reverse(getOrdersSummary(state, (state: IState) => getOrders(state, ownProps.filterStatus)));
}

function mapStateToProps(state: IState, ownProps: AllOrdersTableContainerProps) {
    return {
        title: "כל ההזמנות",
        elements: getElements(state, ownProps),
        beforeTable: ownProps.beforeTable,
        limit: ownProps.limit,
        tableHeaders: [
            {orderId: "מספר הזמנה"},
            {organizationName: "שם הארגון"},
            {date: "תאריך הרצאה"},
            {topic: "נושא"},
            {status: "סטאטוס"},
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
    };
}

export interface AllOrdersTableContainerProps {
    beforeTable?: React.ReactNode;
    filterStatus?: Status;
    limit: number;
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);