import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectOrder} from "../../store/selected/actions";
import {getLabels} from "../../store/labels/reducer";
import {getOrders, getOrdersSummary} from "../../store/orders/reducer";
import {withRouter} from "react-router";
import * as _ from "lodash";
import {redirect} from "../../util/history-util";
import CustomPaperTable from "../../components/tables/custom-paper-table";

class AllOrdersTable extends React.Component {
    selectOrder(orderId) {
        this.props.dispatch(selectOrder(orderId));
        redirect(this.props.history, '/form');
    }

    render() {
        return (
            <CustomPaperTable
                title={this.props.labels.title}
                tableHeaders={this.props.labels.tableHeaders}
                elements={this.props.orders}
                rowIndexKey="id"
                onEditButton={this.selectOrder.bind(this)}
                hideEdit={this.props.hideEdit}
                limit={this.props.limit}
            />
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        labels: getLabels(state).pages.allOrdersPage.table,
        orders: _.reverse(getOrdersSummary(state, getOrders)),
        ...ownProps,
    };
}

AllOrdersTable.propTypes = {
    hideEdit: PropTypes.bool,
    limit: PropTypes.number,
};

AllOrdersTable.defaultProps = {
    hideEdit: false,
    limit: -1,
};

export default withRouter(connect(mapStateToProps)(AllOrdersTable));
