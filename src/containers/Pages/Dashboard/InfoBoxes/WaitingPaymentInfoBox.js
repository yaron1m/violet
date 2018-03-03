import {connect} from "react-redux";
import {getLabels} from "../../../../store/labels/reducer";
import {redirect} from "../../../../util/history-util";
import {getOrders} from "../../../../store/orders/selectors";
import * as _ from 'lodash';
import {isFetching} from "../../../../store/firebase/reducer";
import Status from "../../../../util/consts/status";
import PaymentIcon from 'material-ui-icons/AttachMoney';
import InfoBox from "./InfoBox";
import Colors from "../../../../util/consts/colors";
import {moneyFormat} from "../../../../util/string-util";

function calculateWaitingPaymentSum(state) {
    if (isFetching(state))
        return;

    let sum = 0;
    const waitingPaymentOrders = getOrders(state, Status.waitingPayment);
    _.forEach(waitingPaymentOrders, function (order) {
        sum += _.parseInt(order.totalSum);
    });

    return moneyFormat(sum, getLabels(state).currencyIcon);
}

function areThereLatePaymentOrders(state) {
    if (isFetching(state))
        return;

    const now = new Date();
    const waitingPaymentOrders = getOrders(state, Status.waitingPayment);
    return _.some(waitingPaymentOrders, order => new Date(order.expectedPayDate) < now);
}


function mapStateToProps(state) {
    return {
        Icon: PaymentIcon,
        color: Colors.infoBoxes.green,
        title: getLabels(state).pages.dashboard.infoBoxes.waitingPayment,
        value: calculateWaitingPaymentSum(state),
        error: areThereLatePaymentOrders(state),
    };
}

function mapDispatchToProps() {
    return {
        onClick: (orderId) => redirect('/payment'),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);