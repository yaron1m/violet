import {connect} from "react-redux";
import {getLabels} from "../../../../store/labels/reducer";
import {redirect} from "../../../../util/history-util";
import {getOrders} from "../../../../store/orders/selectors";
import * as _ from 'lodash';
import {isFetching} from "../../../../store/firebase/reducer";
import Status from "../../../../util/consts/status";
import CreditCardIcon from 'material-ui-icons/CreditCard';
import InfoBox from "./InfoBox";
import Colors from "../../../../util/consts/colors";
import {isEmptyValue, moneyFormat} from "../../../../util/string-util";

function calculateExpectedIncome(state) {
    if (isFetching(state))
        return;

    let sum = 0;
    const expectedIncomeOrders = getOrders(state, [Status.waitingPayment, Status.executed, Status.isExecuting, Status.approvedOrder]);

    _.forEach(expectedIncomeOrders, function (order) {
        if (!isEmptyValue(order, "totalSum"))
            sum += _.parseInt(order.totalSum);
    });

    return moneyFormat(sum, getLabels(state).currencyIcon);
}


function mapStateToProps(state) {
    return {
        Icon: CreditCardIcon,
        color: Colors.infoBoxes.lightBlue,
        title: getLabels(state).pages.dashboard.infoBoxes.expectedIncome,
        value: calculateExpectedIncome(state),
    };
}

function mapDispatchToProps() {
    return {
        onClick: (orderId) => redirect('/expectedIncome'),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);