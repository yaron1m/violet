import {connect} from "react-redux";
import {redirect} from "../../../Util/HistoryUtil";
import {getOrders} from "../../../Store/Orders/Selectors";
import * as _ from "lodash";
import {isFetching} from "../../../Store/Firebase/Selectors";
import {Status} from "../../../Util/Constants/Status";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import InfoBox from "./InfoBox";
import Colors from "../../../Util/Constants/Colors";
import {isEmptyValue, moneyFormat} from "../../../Util/StringUtil";
import {IState} from "../../../Interfaces/ReduxInterfaces";
import {IOrder} from "@violet/common";
import {Path} from "../../Path";

function calculateExpectedIncome(isFetching: boolean, expectedIncomeOrders: IOrder[]) {
    if (isFetching)
        return;

    let sum = 0;

    _.forEach(expectedIncomeOrders, function (order) {
        if (!isEmptyValue(order, "totalSum"))
            sum += _.parseInt(order.totalSum);
    });

    return moneyFormat(sum.toString());
}

function mapStateToProps(state: IState) {
    return {
        Icon: CreditCardIcon,
        color: Colors.infoBoxes.lightBlue,
        title: "צבר הזמנות",
        value: calculateExpectedIncome(isFetching(state),
            getOrders(state, [Status.waitingPayment, Status.executed, Status.isExecuting, Status.approvedOrder])),
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => redirect(Path.expectedIncome),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);