import {getOrders} from "./selectors";
import _ from 'lodash';
import {getOrderStatusLabel} from "../../util/OrderStatus";
import {getOrganizationById} from "../organizations/reducer";
import {getLabels} from "../labels/reducer";
import Status from "../../util/Constants/Status";
import {isEmptyValue} from "../../util/StringUtil";

export default function getActionRequiredOrdersArray(state) {
    const orders = getOrders(state);
    const issues = getLabels(state).pages.actionRequiredPage.issues;

    const now = new Date();

    const result = [];

    _.forEach(orders, function checkActionRequired(order) {
            if (order.followUpRequired) {
                if (new Date(order.followUpDate) < now)
                    addOrderToResult(state, result, order, issues.followUpRequired
                        + " - " + new Date(order.followUpDate).toLocaleDateString());
                return;
            }

            switch (order.status) {

                case Status.contact:
                case Status.offer:
                    if (addTwoWeeks(order.createdDate) < now)
                        addOrderToResult(state, result, order, issues.twoWeeksPassedFromCreation);
                    return;

                case Status.order: {
                    const firstLectureTimeDate = _.sortBy(order.lectureTimes, time => time.date)[0].date;
                    if (new Date(firstLectureTimeDate) < addTwoWeeks(now.toJSON())) {
                        addOrderToResult(state, result, order, issues.noOrderApproval);
                        return;
                    }

                    if (addTwoWeeks(order.createdDate) < now)
                        addOrderToResult(state, result, order, issues.twoWeeksPassedFromCreation);
                    return;
                }

                case Status.approvedOrder:
                case Status.isExecuting:
                case Status.executed: {
                    const lastLectureTimeDate = _.sortBy(order.lectureTimes, time => -time.date)[0].date;
                    if (isEmptyValue(order, "proformaInvoiceNumber") && new Date(lastLectureTimeDate) < now) {
                        addOrderToResult(state, result, order, issues.executedAndNoInvoice);
                        return;
                    }
                    return;
                }

                case Status.waitingPayment:
                    if (new Date(order.expectedPayDate) < now)
                        addOrderToResult(state, result, order, issues.notPaidOnTime);
                    return;

                default:
                    return;
            }
        }
    );

    return result;
}

function addOrderToResult(state, result, order, issue) {
    result.push({
        ...order,
        issue,
        organizationName: getOrganizationById(state, order.organizationId).organizationName,
        status: getOrderStatusLabel(state, order),
    });
}

function addTwoWeeks(dateString) {
    const twoWeeks = 12096e5;
    return new Date(new Date(dateString).valueOf() + twoWeeks);
}