import {IRequiredFields, mergerRequiredFields} from './Util';

const contact: IRequiredFields = {
    order: ['contactFirstName', 'contactLastName', 'contactPhone1', 'contactEmail'],
    organization: ['organizationName'],
    lectureTimes: [],
    internalOrder: [],
    publicCourse: [],
};

const offer = mergerRequiredFields(contact, {
    lectureTimes: ['topic'],
});

const order = mergerRequiredFields(offer, {
    lectureTimes: ['date', 'startTime', 'endTime'],
    publicCourse: ['participantFirstName', 'participantLastName'],
});

const approvedOrder = mergerRequiredFields(order, {
    organization: ['companyId', 'paymentConditions'],
    order: ['financialContactFirstName', 'financialContactLastName', 'financialContactPhone1',
        'financialContactEmail', 'cost', 'totalSum', 'internalOrderNumber'],
    internalOrder: ['street', 'streetNumber', 'city', 'parking', 'projector', 'soundSystem', 'microphone'],
    publicCourse: ['idNumber', 'phone', 'email'],
});

const isExecuting = mergerRequiredFields(approvedOrder);

const executed = mergerRequiredFields(isExecuting);

const waitingPayment = mergerRequiredFields(executed, {
    order: ['totalSum', 'expectedPayDate']
});

const payed = mergerRequiredFields(waitingPayment, {});

const cancelled: IRequiredFields = {
    order: ['cancellationReason'],
    organization: [],
    lectureTimes: [],
    internalOrder: [],
    publicCourse: [],
};

const rejected: IRequiredFields = {
    order: ['rejectionReason'],
    organization: [],
    lectureTimes: [],
    internalOrder: [],
    publicCourse: [],
};

const followUpRequired: IRequiredFields = {
    order: ['followUpDate', 'followUpDetails'],
    organization: [],
    lectureTimes: [],
    internalOrder: [],
    publicCourse: [],
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