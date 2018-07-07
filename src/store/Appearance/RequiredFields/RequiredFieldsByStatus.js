import {mergerRequiredFields} from "./Util";

const contact = {
    order: ["contactFirstName", "contactLastName", "contactPhone1", "contactEmail"],
    organization: ["organizationName"],
    lectureTimes: [],
    internalOrder: [],
    publicCourse: [],
};

const offer = mergerRequiredFields(contact, {
    lectureTimes: ["topic"],
});

const order = mergerRequiredFields(offer, {
    lectureTimes: ["date", "startTime", "endTime"],
    publicCourse: ["participantFirstName", "participantLastName"],
});

const approvedOrder = mergerRequiredFields(order, {
    organization: ["companyId", "paymentConditions"],
    order: ["financialContactFirstName", "financialContactLastName", "financialContactPhone1",
        "financialContactEmail", "cost", "totalSum", "internalOrderNumber"],
    internalOrder: ["street", "streetNumber", "city", "parking", "projector", "soundSystem", "microphone"],
    publicCourse: ["idNumber", "phone", "job", "email"],
});

const isExecuting = mergerRequiredFields(approvedOrder);

const executed = mergerRequiredFields(isExecuting);

const waitingPayment = mergerRequiredFields(executed, {
    order: ["totalSum", "expectedPayDate"]
});

const payed = mergerRequiredFields(waitingPayment, {
});

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

const followUpRequired = {
    order: ["followUpDate", "followUpDetails"],
    organization: [],
    lectureTimes: [],
};

export default {
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
    followUpRequired,
};