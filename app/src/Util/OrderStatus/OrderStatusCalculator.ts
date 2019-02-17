import * as _ from "lodash";
import {progressiveStatuses, Status, terminatingStatuses} from "../Constants/Status";
import {existsAndNotEmpty} from "./OrderStatusUtils";
import {hasDatePassed} from "../TimeUtil";
import {isPublicCourseOrder} from "../../Store/SelectedOrder/Selectors";
import IOrder from "../../Interfaces/IOrder";
import IPublicCourse from "../../Interfaces/IPublicCourse";

export default function calculateOrderStatus(order: IOrder, publicCourse: IPublicCourse) {
    // let possibleStatuses = _.values(terminatingStatuses);
    // for (let i = 0; i < possibleStatuses.length; i++) {
    for (let status in terminatingStatuses) {
        if (meetsRequirements(order, publicCourse, status as Status)) {
            return status as Status;
        }
    }

    // possibleStatuses = _.values(progressiveStatuses);
    let result = Status.contact;

    // for (let i = 0; i < possibleStatuses.length; i++) {
    for (let possibleStatus in progressiveStatuses) {
        const status = possibleStatus as Status;
        if (meetsRequirements(order, publicCourse, status)) {
            result = status;
        } else {
            break;
        }
    }

    return result;
}

function meetsRequirements(order: IOrder, publicCourse: IPublicCourse, statusName: Status) {
    switch (statusName) {
        case Status.contact:
            return isContact();

        case Status.offer:
            return isOffer(order);

        case Status.order:
            return isOrder(order);

        case Status.approvedOrder:
            return isApprovedOrder(order);

        case Status.isExecuting:
            return isExecuting(order, publicCourse);

        case Status.executed:
            return isExecuted(order, publicCourse);

        case Status.waitingPayment:
            return isWaitingPayment(order);

        case Status.payed:
            return isPayed(order);

        case Status.cancelled:
            return isCancelled(order);

        case Status.rejected:
            return isRejected(order);

        default:
            return false;
    }
}

function isContact() {
    // An order is always a contact
    return true;
}

function isOffer(order: IOrder) {
    if (isPublicCourseOrder(order)) {
        return existsAndNotEmpty(order, "publicCourseParticipants");
    }

    // Order must have at least one lecture time with a topic
    if (!existsAndNotEmpty(order, "lectureTimes"))
        return false;

    return _.some(order.lectureTimes, lectureTime => Boolean(lectureTime.topic));
}

function isOrder(order: IOrder) {
    if (isPublicCourseOrder(order)) {
        // Order must have at lease one participant attending one lecture
        return _.some(order.publicCourseParticipants, participant =>
            _.isArray(participant.lecturesAttending) && participant.lecturesAttending.length !== 0);
    }

    // Order must have at lease one lecture with date
    return _.some(order.lectureTimes, lectureTime => Boolean(lectureTime.date));
}

function isApprovedOrder(order: IOrder) {
    // Order must be approved
    return existsAndNotEmpty(order, "orderApproved");
}

function isExecuting(order: IOrder, publicCourse: IPublicCourse) {
    let datesToCheck;
    if (isPublicCourseOrder(order)) {
        datesToCheck = _.map(publicCourse.lectures, lecture => lecture.date);
    } else {
        datesToCheck = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
    }

    // At least one lectures is done
    return _.some(datesToCheck, hasDatePassed);
}

function isExecuted(order: IOrder, publicCourse: IPublicCourse) {
    // All lectures passed
    let datesToCheck;
    if (isPublicCourseOrder(order)) {
        datesToCheck = _.map(publicCourse.lectures, lecture => lecture.date);
    } else {
        datesToCheck = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
    }

    return _.every(datesToCheck, hasDatePassed);
}

function isWaitingPayment(order: IOrder) {
    // Order has proforma or tax invoice number
    return existsAndNotEmpty(order, "proformaInvoiceNumber")
        || existsAndNotEmpty(order, "taxInvoiceNumber");
}

function isPayed(order: IOrder) {
    return existsAndNotEmpty(order, "receiptNumber");
}

function isCancelled(order: IOrder) {
    return order.cancelled;
}

function isRejected(order: IOrder) {
    return order.rejected;
}
