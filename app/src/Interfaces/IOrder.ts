import {Status, TabKey} from "../Util/Constants/Status";

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

export type IPublicCourseParticipantField =
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
    participantCost: string;
    participantFirstName: string;
    participantLastName: string;
    phone: string;
}