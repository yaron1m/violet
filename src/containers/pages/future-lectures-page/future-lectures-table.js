import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CustomPaper from "../../../components/custom-components/custom-paper";
import CustomTable from "../../../components/custom-components/custom-table";
import {selectOrder} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getAllLectureTimes, getWaitingPaymentOrders} from "../../../store/orders/reducer";
import {withRouter} from "react-router";
import * as _ from "lodash";
import CustomTableRow from "../../../components/custom-components/custom-table-row";
import {redirect} from "../../../util/history-util";
import {Status} from "../../../util/order-status";

class FutureLecturesTable extends React.Component {
    selectOrder(orderId) {
        this.props.dispatch(selectOrder(orderId));
        redirect(this.props.history, '/form');
    }

    render() {
        const now = new Date();
        let futureLectureTimes = _.sortBy(
            _.filter(this.props.futureLectureTimes, lectureTime => new Date(lectureTime.date) > now),
            x => x.date);

        if(this.props.limit !== -1){
            futureLectureTimes = _.slice(futureLectureTimes, 0, this.props.limit);
        }

        return (
            <CustomPaper title={this.props.labels.title}>

                <CustomTable headers={this.props.labels.tableHeaders} hideEdit={this.props.hideEdit}>
                    {
                        futureLectureTimes.map((lectureTime, index) =>
                            <CustomTableRow
                                key={index}
                                rowIndex={lectureTime.orderId}
                                headers={this.props.labels.tableHeaders}
                                element={lectureTime}
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
        labels: getLabels(state).futureLecturesPage.table,
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
