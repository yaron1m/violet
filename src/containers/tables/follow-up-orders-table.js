import React from 'react';
import {connect} from 'react-redux';
import CustomPaper from "../../components/custom-components/custom-paper";
import CustomTable from "../../components/tables/custom-table";
import {selectOrder} from "../../store/selected/actions";
import {getLabels} from "../../store/labels/reducer";
import {getFollowUpOrdersSummary} from "../../store/orders/reducer";
import {withRouter} from "react-router";
import * as _ from "lodash";
import CustomTableRow from "../../components/tables/custom-table-row";
import {redirect} from "../../util/history-util";

class OrdersSummary extends React.Component {
    selectOrder(orderId) {
        this.props.dispatch(selectOrder(orderId));
        redirect(this.props.history, '/form');
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
                                    headers={this.props.labels.tableHeaders}
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
        labels: getLabels(state).followUpPage.table,
        followUpOrdersSummary: _.sortBy(getFollowUpOrdersSummary(state), x => x.followUpDate),
    };
}

export default withRouter(connect(mapStateToProps)(OrdersSummary));
