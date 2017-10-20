import React from 'react';
import {connect} from 'react-redux';
import {clearSelectedOrder, selectOrder} from "../../store/selected/actions";
import {getLabels} from "../../store/labels/reducer";
import {getOrdersByOrganization, getOrdersSummary} from "../../store/orders/reducer";
import {isSelectedOrganization} from "../../store/selected/reducer";
import {withRouter} from "react-router";
import {redirect} from "../../util/history-util";
import CustomPaperTable from "../../components/tables/custom-paper-table";

class OrganizationsOrdersTable extends React.Component {
    addNewOrder() {
        this.props.dispatch(clearSelectedOrder());
        redirect(this.props.history, '/form');
    }

    selectOrder(orderId) {
        this.props.dispatch(selectOrder(orderId));
        redirect(this.props.history, '/form');
    }

    render() {
        console.log(this.props.ordersSummary);

        return (
            <CustomPaperTable
                title={this.props.labels.title}
                tableHeaders={this.props.labels.tableHeaders}
                elements={this.props.ordersSummary}
                rowIndexKey="id"
                onEditButton={this.selectOrder.bind(this)}
                hideEdit={this.props.hideEdit}
                limit={this.props.limit}

                singleCellRow={this.props.isSelectedOrganization}
                singleCellRowText={this.props.labels.addRow}
                singleCellRowOnClick={this.addNewOrder.bind(this)}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).OrganizationPage.ordersSummary,
        isSelectedOrganization: isSelectedOrganization(state),
        ordersSummary: getOrdersSummary(state, getOrdersByOrganization).reverse(),
    };
}

export default withRouter(connect(mapStateToProps)(OrganizationsOrdersTable));
