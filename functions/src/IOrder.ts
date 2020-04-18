
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
    rejectionReason: string;
    rejectionDetails: string;
    cancelled: boolean;
    cancellationReason: string;
    cancellationDetails: string;
    lectureTimes: ILectureTime[];

    // Public course:
    publicCourseId: number;
    publicCourseParticipants: IPublicCourseParticipant[];

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

export type IOrderBooleanField = "projector" |
    "soundSystem" |
    "microphone" |
    "parking" |
    "orderApproved" |
    "sameAudience" |
    "rejected" |
    "cancelled" |
    "followUpRequired";

export type IOrderStringField =
    "changedDate" |
    "createdDate" |
    "contactFirstName" |
    "contactLastName" |
    "contactPhone1" |
    "contactPhone2" |
    "contactEmail" |
    "contactJob" |
    "contactPhoneExtension" |
    "contactFax" |
    "street" |
    "streetNumber" |
    "city" |
    "location" |
    "audienceType" |
    "daySchedule" |
    "followUpDate" |
    "followUpDetails" |
    "cost" |
    "oneWayDistance" |
    "travelExpenses" |
    "extraCosts" |
    "sum" |
    "vat" |
    "totalSum" |
    "financialContactFirstName" |
    "financialContactLastName" |
    "financialContactPhone1" |
    "financialContactPhone2" |
    "financialContactEmail" |
    "financialContactJob" |
    "financialContactPhoneExtension" |
    "financialContactFax" |
    "proformaInvoiceNumber" |
    "proformaInvoiceDate" |
    "expectedPayDate" |
    "internalOrderNumber" |
    "taxInvoiceNumber" |
    "taxInvoiceDate" |
    "receiptNumber" |
    "notes" |
    "rejectionReason" |
    "rejectionDetails" |
    "cancellationReason" |
    "cancellationDetails";

export type ILectureTimeField = "topic" | "audienceSize" | "date" | "duration" | "endTime" | "startTime";

export type IStringObject = { [key: string]: string };

export interface ILectureTime {
    topic: string;
    audienceSize: string;
    date: string;
    duration: string;
    endTime: string;
    startTime: string;
    tie: string;
    travelTime: string;
}

export type IPublicCourseParticipantStringField =
    "idNumber"
    | "lecturesAttending"
    | "email"
    | "participantCost"
    | "participantFirstName"
    | "participantLastName"
    | "phone";

export interface IPublicCourseParticipant {
    idNumber: string;
    lecturesAttending: number[];
    email: string;
    job: string;
    participantCost: string;
    participantFirstName: string;
    participantLastName: string;
    participantEnglishFirstName: string;
    participantEnglishLastName: string;
    phone: string;
    isqMember: boolean;
}


export enum Status {
    contact = "contact",
    offer = "offer",
    order = "order",
    approvedOrder = "approvedOrder",
    isExecuting = "isExecuting",
    executed = "executed",
    waitingPayment = "waitingPayment",
    payed = "payed",

    cancelled = "cancelled",
    rejected = "rejected",
}

// export default Status;

export enum TabKey {
    internalTabKey = "internalTab",
    publicCourseTabKey = "publicCourseTab"
}
