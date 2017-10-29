import {getOrders} from "./reducer";
import _ from 'lodash';
import {getOrderStatusLabel, progressiveStatuses} from "../../util/order-status";
import {getOrganizationById} from "../organizations/reducer";
import {getLabels} from "../labels/reducer";

export default function getActionRequiredOrdersArray(state) {
    const orders = getOrders(state);
    const issues = getLabels(state).pages.actionRequiredPage.issues;

    const now = new Date();

    let result = [];

    _.forEach(orders, function checkActionRequired(order) {
            if (order.followUpRequired) {
                if (new Date(order.followUpDate) < now)
                    addOrderToResult(state, result, order, issues.followUpRequired
                        + " - " + new Date(order.followUpDate).toLocaleDateString());
                return;
            }

            switch (order.status) {

                case progressiveStatuses.contact:
                case progressiveStatuses.offer:
                    if (addTwoWeeks(order.createdDate) < now)
                        addOrderToResult(state, result, order, issues.twoWeeksPassedFromCreation);
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

                case progressiveStatuses.executed:
                    addOrderToResult(state, result, order, issues.executedAndNoInvoice);
                    return;

                case progressiveStatuses.waitingPayment:
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
    return new Date(+new Date(dateString) + twoWeeks);
}