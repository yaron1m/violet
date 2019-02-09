import {connect} from "react-redux";
import {getLabels} from "../../../Store/Labels/Selectors";
import {redirect} from "../../../Util/HistoryUtil";
import {getOrders} from "../../../Store/Orders/Selectors";
import * as _ from 'lodash';
import {isFetching} from "../../../Store/Firebase/Selectors";
import {Status} from "../../../Util/Constants/Status";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import InfoBox from "./InfoBox";
import Colors from "../../../Util/Constants/Colors";
import {isEmptyValue, moneyFormat} from "../../../Util/StringUtil";
import {IState} from '../../../Interfaces/ReduxInterfaces';
import IOrder from '../../../Interfaces/IOrder';
import {Path} from '../../Path';

function calculateExpectedIncome(isFetching: boolean, expectedIncomeOrders: IOrder[], currencyIcon: string) {
    if (isFetching)
        return;

    let sum = 0;

    _.forEach(expectedIncomeOrders, function (order) {
        if (!isEmptyValue(order, "totalSum"))
            sum += _.parseInt(order.totalSum);
    });

    return moneyFormat(sum.toString(), currencyIcon);
}


function mapStateToProps(state:IState) {
    return {
        Icon: CreditCardIcon,
        color: Colors.infoBoxes.lightBlue,
        title: getLabels(state).pages.dashboard.infoBoxes.expectedIncome,
        value: calculateExpectedIncome(isFetching(state),
            getOrders(state, [Status.waitingPayment, Status.executed, Status.isExecuting, Status.approvedOrder]),
            getLabels(state).currencyIcon),
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => redirect(Path.expectedIncome),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);