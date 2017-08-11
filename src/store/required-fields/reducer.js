import * as _ from "lodash";

export function getRequiredFields(state) {
    return state.requiredFields;
}

export default function () {
    const contact = ["organizationId", "contactFirstName", "contactLastName", "contactPhone1", "contactEmail"];
    const offer = _.concat(contact, []);
    const order = _.concat(offer, []);
    const approvedOrder = _.concat(order, ["financialContactFirstName", "financialContactLastName", "financialContactPhone1", "financialContactEmail"]);
    const isExecuting = _.concat(approvedOrder, []);
    const executed = _.concat(isExecuting, []);
    const waitingPayment = _.concat(executed, []);
    const payed = _.concat(waitingPayment, []);
    const cancelled = [];

    return {
        contact,
        offer,
        order,
        approvedOrder,
        isExecuting,
        executed,
        waitingPayment,
        payed,
        cancelled,
        requiredLabel: "שדה נדרש",
    };
}