import Immutable from "seamless-immutable";
import {mergerRequiredFields} from "./util";

const contact = {
    order: ["contactFirstName", "contactLastName", "contactPhone1", "contactEmail"],
    organization: ["organizationName"],
    lectureTimes: [],
};

const offer = mergerRequiredFields(contact, {
    lectureTimes: ["topic"],
});

const order = mergerRequiredFields(offer, {
    lectureTimes: ["date", "startTime", "endTime"],
});

const approvedOrder = mergerRequiredFields(order, {
    order: ["street", "streetNumber", "city", "financialContactFirstName", "financialContactLastName", "financialContactPhone1",
        "financialContactEmail", "amount", "parking", "projector", "soundSystem", "microphone", "internalOrderNumber"]
});

const isExecuting = mergerRequiredFields(approvedOrder);

const executed = mergerRequiredFields(isExecuting);

const waitingPayment = mergerRequiredFields(executed);

const payed = mergerRequiredFields(waitingPayment);

const cancelled = {
    order: ["cancellationReason"],
    organization: [],
    lectureTimes: [],
};

const rejected = {
    order: ["rejectionReason"],
    organization: [],
    lectureTimes: [],
};

export default Immutable({
    contact,
    offer,
    order,
    approvedOrder,
    isExecuting,
    executed,
    waitingPayment,
    payed,
    cancelled,
    rejected,
    showRequiredFields: false,
});