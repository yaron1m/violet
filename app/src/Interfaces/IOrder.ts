import {Status, TabKey} from '../util/Constants/Status';

export default interface IOrder {
    id: number,
    organizationId: number;
    status: Status;
    changedDate: string;
    createdDate: string;

    // Contact
    contactFirstName: string;
    contactLastName: string;
    contactPhone1: string;
    contactPhone2: string;
    contactEmail: string;
    contactJob: string;
    contactPhoneExtension: string;
    contactFax: string;

    // Lecture Details
    lectureDetailsTabKey: TabKey;

    street: string;
    streetNumber: string;
    city: string;
    location: string;
    audienceType: string;
    daySchedule: string;

    projector: boolean;
    soundSystem: boolean;
    microphone: boolean;
    parking: boolean;
    orderApproved: boolean;
    sameAudience: boolean;
    rejected: boolean;
    cancelled: boolean;
    lectureTimes: ILectureTime[];

    // Public course:
    publicCourseParticipants: IPublicCourseParticipants[];

    // Follow up
    followUpRequired: boolean;
    followUpDate: string;
    followUpDetails: string;

    // Payment
    cost: string;
    oneWayDistance: string;
    travelExpenses: string;
    extraCosts: string;
    sum: string;
    vat: string;
    totalSum: string;

    // Financial Contact
    financialContactFirstName: string;
    financialContactLastName: string;
    financialContactPhone1: string;
    financialContactPhone2: string;
    financialContactEmail: string;
    financialContactJob: string;
    financialContactPhoneExtension: string;
    financialContactFax: string;

    // Invoice
    proformaInvoiceNumber: string;
    proformaInvoiceDate: string;
    expectedPayDate: string;
    internalOrderNumber: string;
    taxInvoiceNumber: string;
    taxInvoiceDate: string;
    receiptNumber: string;

    // Notes
    notes: string;
}

interface ILectureTime {
    topic: string;
    audienceSize: string;
    date: string;
    duration: string;
    endTime: string;
    startTime: string;
}

interface IPublicCourseParticipants{
    email: string;
    idNumber: string;
    lecturesAttending: number[];
    participantCost: string;
    participantFirstName: string;
    participantLastName: string;
    phone: string;
}