import {connect} from "react-redux";
import {getLabels} from "../../../../store/Labels/Selectors";
import {redirect} from "../../../../util/HistoryUtil";
import {getOrders} from "../../../../store/Orders/Selectors.ts";
import * as _ from 'lodash';
import {isFetching} from "../../../../store/Firebase/Selectors";
import {Status} from "../../../../util/Constants/Status";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import InfoBox from "./InfoBox";
import Colors from "../../../../util/Constants/Colors";
import {isEmptyValue, moneyFormat} from "../../../../util/StringUtil";

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
        onClick: () => redirect('/expectedIncome'),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);