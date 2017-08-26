import React from 'react';
import {connect} from 'react-redux';
import CustomPaper from "../../../components/custom-components/custom-paper";
import CustomTable from "../../../components/custom-components/custom-table";
import {clearSelectedOrder, selectOrder} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getOrdersSummary} from "../../../store/orders/reducer";
import {isSelectedOrganization} from "../../../store/selected/reducer";
import {withRouter} from "react-router";
import * as _ from "lodash";
import CustomTableRow from "../../../components/custom-components/custom-table-row";
import {TableRow, TableRowColumn} from "material-ui";

class OrdersSummary extends React.Component {
    addNewOrder() {
        this.props.dispatch(clearSelectedOrder());
        if (this.props.history.location.pathname !== '/form')
            this.props.history.push('/form');
    }

    selectOrder(orderId) {
        this.props.dispatch(selectOrder(orderId));
        if (this.props.history.location.pathname !== '/form')
            this.props.history.push('/form');
    }

    render() {
        return (
            <CustomPaper title={this.props.labels.title}>

                <CustomTable headers={this.props.labels.tableHeaders}>

                    {this.props.isSelectedOrganization ?
                        (<TableRow selectable={false}>
                            <TableRowColumn/>
                            <TableRowColumn/>
                            <TableRowColumn>
                                <div style={{cursor: "pointer"}} onClick={this.addNewOrder.bind(this)}>
                                    {this.props.labels.addRow}
                                </div>
                            </TableRowColumn>
                            <TableRowColumn/>
                            <TableRowColumn/>

                        </TableRow>)
                        : null}

                    {
                        _.map(this.props.ordersSummary, (order =>
                                <CustomTableRow
                                    rowIndex={order.id}
                                    headerKeys={this.props.labels.tableHeaders.map((header) => (Object.keys(header)[0]))}
                                    element={order}
                                    onEditButton={this.selectOrder.bind(this)}
                                />
                        ))
                    }
                </CustomTable>
            </CustomPaper>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).OrganizationPage.ordersSummary,
        isSelectedOrganization: isSelectedOrganization(state),
        ordersSummary: getOrdersSummary(state),
    };
}

export default withRouter(connect(mapStateToProps)(OrdersSummary));
