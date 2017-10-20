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

                case progressiveStatuses.contact:
                case progressiveStatuses.offer:
                    if (addTwoWeeks(order.createdDate) < now)
                        addOrderToResult(state, result, order, issues.twoWeeksPassedFromCreation);
                    return;

                default:
                    break;
            }
        }
    );

    console.log(result);
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