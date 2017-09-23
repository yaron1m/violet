import React from 'react';
import {cyan600, pink600, purple800, green500} from 'material-ui/styles/colors';
import CheckBox from 'material-ui/svg-icons/action/check-circle';
import Payment from 'material-ui/svg-icons/editor/attach-money';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import InfoBox from "../../../components/dashboard/info-box";
import {connect} from "react-redux";
import {getLabels} from "../../../store/labels/reducer";
import {redirect} from "../../../util/history-util";
import {withRouter} from "react-router";
import {
    getAllLectureTimes, getFollowUpOrdersSummary, getOrders,
} from "../../../store/orders/reducer";
import * as _ from 'lodash';
import {isFetching} from "../../../store/firebase/reducer";
import {Status} from "../../../util/order-status";

class InfoBoxes extends React.Component {

    calculateFutureLectures() {
        if (this.props.isFetching)
            return;

        const now = new Date();
        const futureLectureTimes = _.filter(this.props.futureLectureTimes,
            lectureTime => new Date(lectureTime.date) > now);
        return futureLectureTimes.length.toString();
    }

    calculateFollowUpSummary() {
        if (this.props.isFetching)
            return;

        return this.props.followUpOrdersSummary.length.toString();
    }

    calculateWaitingPaymentCount() {
        if (this.props.isFetching)
            return;

        return this.props.waitingPaymentOrders.length.toString();
    }

    calculateWaitingPaymentSum() {
        if (this.props.isFetching)
            return;

        let sum = 0;
        _.forEach(this.props.waitingPaymentOrders, function (order) {
            sum += _.parseInt(order.amount);
        });

        return sum + " " + this.props.labels.currencyIcon;
    }


    render() {
        const style = {
            box: {
                width: "100%",
                marginLeft: 20,
                cursor: "pointer",
            },
            lastBox: {
                width: "100%",
                cursor: "pointer",
            }
        };


        return (
            <div style={{display: "flex"}}>
                <div style={style.box} onClick={() => redirect(this.props.history, '/form')}>
                    <InfoBox
                        Icon={AddIcon}
                        color={purple800}
                        value={this.props.labels.newOrder}
                    />
                </div>


                <div style={style.box} onClick={() => redirect(this.props.history, '/futureLectures')}>
                    <InfoBox
                        Icon={CheckBox}
                        color={cyan600}
                        title={this.props.labels.futureLectures}
                        value={this.calculateFutureLectures.bind(this)()}
                    />
                </div>


                <div style={style.box} onClick={() => redirect(this.props.history, '/followup')}>
                    <InfoBox
                        Icon={NotificationsIcon}
                        color={pink600}
                        title={this.props.labels.followUp}
                        value={this.calculateFollowUpSummary.bind(this)()}
                    />
                </div>

                <div style={style.lastBox} onClick={() => redirect(this.props.history, '/payment')}>
                    <InfoBox
                        Icon={Payment}
                        color={green500}
                        title={this.props.labels.expectedIncome}
                        value={this.calculateWaitingPaymentSum.bind(this)()}
                    />
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).homePage.infoBoxes,
        orders: getOrders(state),
        followUpOrdersSummary: getFollowUpOrdersSummary(state),
        futureLectureTimes: getAllLectureTimes(state, [Status.approvedOrder, Status.isExecuting]),
        waitingPaymentOrders: getOrders(state, Status.waitingPayment),
        isFetching: isFetching(state),
    };
}

export default withRouter(connect(mapStateToProps)(InfoBoxes));