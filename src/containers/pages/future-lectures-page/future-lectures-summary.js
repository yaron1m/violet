import React from 'react';
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

class FutureLecturesSummary extends React.Component {
    selectOrder(orderId) {
        this.props.dispatch(selectOrder(orderId));
        redirect(this.props.history, '/form');
    }

    render() {
        const now = new Date();
        const futureLectureTimes = _.filter(this.props.approvedLectureTimes,
            lectureTime => new Date(lectureTime.date) > now);

        console.log(futureLectureTimes);

        return (
            <CustomPaper title={this.props.labels.title}>

                <CustomTable headers={this.props.labels.tableHeaders}>
                    {
                        futureLectureTimes.map((lectureTime , index)=>
                                <CustomTableRow
                                    key={index}
                                    rowIndex={lectureTime.orderId}
                                    headerKeys={this.props.labels.tableHeaders.map((header) => (Object.keys(header)[0]))}
                                    element={lectureTime}
                                    onEditButton={this.selectOrder.bind(this)}
                                />
                        )
                    }
                </CustomTable>
            </CustomPaper>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).futureLectures.table,
        waitingPaymentOrders: getWaitingPaymentOrders(state),
        approvedLectureTimes: getAllLectureTimes(state, Status.approvedOrder),
    };
}

export default withRouter(connect(mapStateToProps)(FutureLecturesSummary));
