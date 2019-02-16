import {connect} from 'react-redux';
import {selectOrder} from '../../Store/SelectedOrder/Actions';
import {getLabels} from '../../Store/Labels/Selectors';
import {getOrders, getOrdersSummary, IOrderSummary} from '../../Store/Orders/Selectors';
import * as _ from 'lodash';
import {redirect} from '../../Util/HistoryUtil';
import CustomPaperTable from '../../Components/Table/CustomPaperTable';
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';
import * as React from 'react';
import {Status} from '../../Util/Constants/Status';
import {Path} from '../Path';

export function getElements(state: IState, ownProps: AllOrdersTableContainerProps) {
    return _.reverse(getOrdersSummary(state, (state: IState) => getOrders(state, ownProps.filterStatus)));
}

function mapStateToProps(state: IState, ownProps: AllOrdersTableContainerProps) {
    return {
        title: getLabels(state).pages.allOrdersPage.title,
        tableHeaders: getLabels(state).pages.allOrdersPage.tableHeaders,
        elements: getElements(state, ownProps),
        beforeTable: ownProps.beforeTable,
        limit: ownProps.limit,
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