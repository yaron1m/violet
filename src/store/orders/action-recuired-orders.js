import {getOrders} from "./reducer";
import _ from 'lodash';
import {getOrderStatus, progressiveStatuses} from "../../util/order-status";
import {getOrganizationById} from "../organizations/reducer";
import {getLabels} from "../labels/reducer";

export default function getActionRequiredOrdersArray(state) {
    const orders = getOrders(state);
    const issues = getLabels(state).actionRequiredPage.issues;

    const now = new Date();

    let result = [];

    _.forEach(orders, function checkActionRequired(order) {
            if (order.followUpRequired) {
                addOrderToResult(state, result, order, issues.followUpRequired);
                return;
            }

            switch (order.status) {
                case progressiveStatuses.waitingPayment:
                    if (new Date(order.expectedPayDate) < now)
                        addOrderToResult(state, result, order, issues.notPaidOnTime);
                    return;

                case progressiveStatuses.order:
                    const firstLectureTimeDate = _.sortBy(order.lectureTimes, time => time.date)[0].date;
                    if (new Date(firstLectureTimeDate) < addTwoWeeks(now.toJSON())) {
                        addOrderToResult(state, result, order, issues.noOrderApproval);
                        return;
                    }

                    if (addTwoWeeks(order.createdDate) < now)
                        addOrderToResult(state, result, order, issues.twoWeeksPassedFromCreation);
                    return;

                case progressiveStatuses.offer:
                case progressiveStatuses.contact:
                    if (addTwoWeeks(order.createdDate) < now)
                        addOrderToResult(state, result, order, issues.twoWeeksPassedFromCreation);
                    return;

                case progressiveStatuses.executed:
                    addOrderToResult(state, result, order, issues.executedAndNoInvoice);
                    return;

                default:
                    break;
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
        status: getOrderStatus(state, order),
    });
}

function addTwoWeeks(dateString) {
    const twoWeeks = 12096e5;
    return new Date(+new Date(dateString) + twoWeeks);
}