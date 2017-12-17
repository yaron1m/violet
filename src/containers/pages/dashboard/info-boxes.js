import React from 'react';
import {cyan600, pink600, brown500, green500} from 'material-ui/styles/colors';
import InfoBox from "../../../components/dashboard/info-box";
import {connect} from "react-redux";
import {getLabels} from "../../../store/labels/reducer";
import {redirect} from "../../../util/history-util";
import {withRouter} from "react-router";
import {
    getAllLectureTimes, } from "../../../store/orders/selectors";
import * as _ from 'lodash';
import {isFetching} from "../../../store/firebase/reducer";
import Status from "../../../util/consts/status";
import CheckBoxIcon from 'material-ui-icons/CheckCircle';
import PaymentIcon from 'material-ui-icons/AttachMoney';
import NotificationsIcon from 'material-ui-icons/Notifications';
import Waiting from 'material-ui-icons/WatchLater';
import {getFollowUpOrdersSummary, getOrders} from "../../../store/orders/selectors";

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

    areThereLatePaymentOrders(){
        if (this.props.isFetching)
            return;
        const now = new Date();
        return _.some(this.props.waitingPaymentOrders, order => new Date(order.expectedPayDate) < now);
    }

    calculateWaitingPaymentSum() {
        if (this.props.isFetching)
            return;

        let sum = 0;
        _.forEach(this.props.waitingPaymentOrders, function (order) {
            sum += _.parseInt(order.totalSum);
        });

        return sum + " " + this.props.currencyIcon;
    }


    render() {
        const style = {
            div:{
                display: "flex",
                marginBottom: 20,
            },
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
            <div style={style.div}>
                <div style={style.box} onClick={() => redirect(this.props.history, '/futureLectures')}>
                    <InfoBox
                        Icon={CheckBoxIcon}
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

                <div style={style.box} onClick={() => redirect(this.props.history, '/payment')}>
                    <InfoBox
                        Icon={Waiting}
                        color={brown500}
                        title={this.props.labels.waitingPayment}
                        value={this.calculateWaitingPaymentCount.bind(this)()}
                        error={this.areThereLatePaymentOrders.bind(this)()}
                    />
                </div>

                <div style={style.lastBox} onClick={() => redirect(this.props.history, '/payment')}>
                    <InfoBox
                        Icon={PaymentIcon}
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
        labels: getLabels(state).pages.dashboard.infoBoxes,
        currencyIcon: getLabels(state).currencyIcon,
        orders: getOrders(state),
        followUpOrdersSummary: getFollowUpOrdersSummary(state),
        futureLectureTimes: getAllLectureTimes(state, [Status.approvedOrder, Status.isExecuting]),
        waitingPaymentOrders: getOrders(state, Status.waitingPayment),
        isFetching: isFetching(state),
    };
}

export default withRouter(connect(mapStateToProps)(InfoBoxes));