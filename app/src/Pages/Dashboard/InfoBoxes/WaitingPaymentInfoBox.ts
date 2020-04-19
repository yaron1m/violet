import {connect} from "react-redux";
import {redirect} from "../../../Util/HistoryUtil";
import {getOrders} from "../../../Store/Orders/Selectors";
import * as _ from "lodash";
import {isFetching} from "../../../Store/Firebase/Selectors";
import {Status} from "@violet/common";
import PaymentIcon from "@material-ui/icons/AttachMoney";
import InfoBox from "./InfoBox";
import Colors from "../../../Util/Constants/Colors";
import {moneyFormat} from "../../../Util/StringUtil";
import {IState} from "../../../Interfaces/ReduxInterfaces";
import {Path} from "../../Path";

function calculateWaitingPaymentSum(state: IState) {
    if (isFetching(state))
        return;

    let sum = 0;
    const waitingPaymentOrders = getOrders(state, Status.waitingPayment);
    _.forEach(waitingPaymentOrders, function (order) {
        sum += _.parseInt(order.totalSum);
    });

    return moneyFormat(sum.toString());
}

function areThereLatePaymentOrders(state: IState) {
    if (isFetching(state))
        return;

    const now = new Date();
    const waitingPaymentOrders = getOrders(state, Status.waitingPayment);
    return _.some(waitingPaymentOrders, order => new Date(order.expectedPayDate) < now);
}

function mapStateToProps(state: IState) {
    return {
        Icon: PaymentIcon,
        color: Colors.infoBoxes.green,
        title: "ממתין לתשלום",
        value: calculateWaitingPaymentSum(state),
        error: areThereLatePaymentOrders(state),
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => redirect(Path.waitingPayment),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);