import React from 'react';
import {connect} from 'react-redux';
import CustomPaper from "../../../components/custom-components/custom-paper";
import CustomTable from "../../../components/custom-components/custom-table";
import {clearSelectedOrder, selectOrder} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getFollowUpOrdersSummary} from "../../../store/orders/reducer";
import {withRouter} from "react-router";
import * as _ from "lodash";
import CustomTableRow from "../../../components/custom-components/custom-table-row";

class OrdersSummary extends React.Component {
    selectOrder(orderId) {
        this.props.dispatch(selectOrder(orderId));
        if (this.props.history.location.pathname !== '/form')
            this.props.history.push('/form');
    }

    render() {
        return (
            <CustomPaper title={this.props.labels.title}>

                <CustomTable headers={this.props.labels.tableHeaders}>
                    {
                        _.map(this.props.followUpOrdersSummary, (order =>
                                <CustomTableRow
                                    key={order.id}
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
        labels: getLabels(state).followUpPage.followUpTable,
        followUpOrdersSummary: getFollowUpOrdersSummary(state),
    };
}

export default withRouter(connect(mapStateToProps)(OrdersSummary));
