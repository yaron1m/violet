import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectOrder} from "../../store/selected/actions";
import {getLabels} from "../../store/labels/reducer";
import {getWaitingPaymentOrders, getAllLectureTimes} from "../../store/orders/selectors";
import {withRouter} from "react-router";
import * as _ from "lodash";
import {redirect} from "../../util/history-util";
import Status from "../../util/consts/status";
import CustomPaperTable from "../../components/tables/custom-paper-table";

class FutureLecturesTable extends React.Component {
    selectOrder(orderId) {
        this.props.dispatch(selectOrder(orderId));
        redirect(this.props.history, '/form');
    }

    render() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0,0,0,0);
        let futureLectureTimes = _.sortBy(
            _.filter(this.props.futureLectureTimes, lectureTime => new Date(lectureTime.date) > yesterday),
            x => x.date);

        return (
            <CustomPaperTable
                title={this.props.labels.title}
                tableHeaders={this.props.labels.tableHeaders}
                elements={futureLectureTimes}
                rowIndexKey="orderId"
                onEditButton={this.selectOrder.bind(this)}
                hideEdit={this.props.hideEdit}
                limit={this.props.limit}
            />
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        labels: getLabels(state).pages.futureLecturesPage.table,
        waitingPaymentOrders: getWaitingPaymentOrders(state),
        futureLectureTimes: getAllLectureTimes(state, [Status.approvedOrder, Status.isExecuting]),
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
