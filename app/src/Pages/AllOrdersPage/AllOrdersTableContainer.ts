import {connect} from 'react-redux';
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {getLabels} from "../../Store/Labels/Selectors";
import {getOrders, getOrdersSummary} from "../../Store/Orders/Selectors";
import * as _ from "lodash";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';
import * as React from 'react';
import {Status} from '../../Util/Constants/Status';

export function getElements(state: IState, ownProps: AllOrdersTableContainerProps) {
    return _.reverse(getOrdersSummary(state, (state: IState) => getOrders(state, ownProps.filterStatus)));
}

export function onEditButton(dispatch: IDispatch, orderId: number) {
    dispatch(selectOrder(orderId));
    redirect('/form');
}

function mapStateToProps(state: IState, ownProps: AllOrdersTableContainerProps) {
    return {
        title: getLabels(state).pages.allOrdersPage.title,
        tableHeaders: getLabels(state).pages.allOrdersPage.tableHeaders,
        elements: getElements(state, ownProps),
        rowIndexKey: "id",
        beforeTable: ownProps.beforeTable,
        limit: ownProps.limit,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (orderId: number) => onEditButton(dispatch, orderId),
    };
}

interface AllOrdersTableContainerProps {
    beforeTable?: React.ReactNode;
    filterStatus?: Status;
    limit: number;
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);