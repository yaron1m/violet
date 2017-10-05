import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CustomPaper from "../../../components/custom-components/custom-paper";
import CustomTable from "../../../components/custom-components/custom-table";
import {selectOrder} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getOrders, getOrdersSummary, getWaitingPaymentOrders} from "../../../store/orders/reducer";
import {withRouter} from "react-router";
import * as _ from "lodash";
import CustomTableRow from "../../../components/custom-components/custom-table-row";
import {redirect} from "../../../util/history-util";

class FutureLecturesTable extends React.Component {
    selectOrder(orderId) {
        this.props.dispatch(selectOrder(orderId));
        redirect(this.props.history, '/form');
    }

    render() {
        let orders = this.props.orders;

        if (this.props.limit !== -1) {
            orders = _.slice(orders, 0, this.props.limit);
        }

        console.log(orders);
        return (
            <CustomPaper title={this.props.labels.title}>

                <CustomTable headers={this.props.labels.tableHeaders} hideEdit={this.props.hideEdit}>
                    {
                        _.map(orders, order =>
                            <CustomTableRow
                                key={order.id}
                                rowIndex={order.id}
                                headers={this.props.labels.tableHeaders}
                                element={order}
                                onEditButton={this.selectOrder.bind(this)}
                                hideEdit={this.props.hideEdit}
                            />
                        )
                    }
                </CustomTable>
            </CustomPaper>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        labels: getLabels(state).allOrdersPage.table,
        waitingPaymentOrders: getWaitingPaymentOrders(state),
        orders: _.reverse(getOrdersSummary(state, getOrders)),
        ...ownProps,
    };
}

FutureLecturesTable.propTypes = {
    hideEdit: PropTypes.bool,
    limit: PropTypes.number,
};

FutureLecturesTable.defaultProps = {
    hideEdit: false,
    limit: -1,
};

export default withRouter(connect(mapStateToProps)(FutureLecturesTable));
