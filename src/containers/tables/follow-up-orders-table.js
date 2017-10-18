import React from 'react';
import {connect} from 'react-redux';
import {selectOrder} from "../../store/selected/actions";
import {getLabels} from "../../store/labels/reducer";
import {getFollowUpOrdersSummary} from "../../store/orders/reducer";
import {withRouter} from "react-router";
import * as _ from "lodash";
import {redirect} from "../../util/history-util";
import CustomPaperTable from "../../components/tables/custom-paper-table";

class FollowUpOrdersTable extends React.Component {
    selectOrder(orderId) {
        this.props.dispatch(selectOrder(orderId));
        redirect(this.props.history, '/form');
    }

    render() {
        return (
            <CustomPaperTable
                title={this.props.labels.title}
                tableHeaders={this.props.labels.tableHeaders}
                elements={this.props.followUpOrdersSummary}
                rowIndexKey="id"
                onEditButton={this.selectOrder.bind(this)}
                hideEdit={this.props.hideEdit}
                limit={this.props.limit}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).followUpPage.table,
        followUpOrdersSummary: _.sortBy(getFollowUpOrdersSummary(state), x => x.followUpDate),
    };
}

export default withRouter(connect(mapStateToProps)(FollowUpOrdersTable));