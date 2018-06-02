import * as _ from "lodash";
import {progressiveStatuses, terminatingStatuses} from "../Constants/Status";
import {existsAndNotEmpty} from "./OrderStatusUtils";
import {
    publicCourseTabKey
} from "../containers/Pages/OrderPage/Sections/LectureDetailsSections/LecturesDetailsSectionContainer";

export default function calculateOrderStatus(order) {
    let possibleStatuses = _.values(terminatingStatuses);
    for (let i = 0; i < possibleStatuses.length; i++) {
        if (meetsRequirements(order, possibleStatuses[i])) {
            return possibleStatuses[i];
        }
    }

    possibleStatuses = _.values(progressiveStatuses);
    let status;

    for (let i = 0; i < possibleStatuses.length; i++) {
        if (meetsRequirements(order, possibleStatuses[i])) {
            status = possibleStatuses[i];
        }
        else {
            break;
        }
    }

    return status;
}

//TODO split this code to files and functions
function meetsRequirements(order, requirement) {

    let lectureTimesDates;
    const lectureDetailsTabKey = order.lectureDetailsTabKey;

    switch (requirement) {
        case progressiveStatuses.contact:
            return true;

        case progressiveStatuses.offer:
            if (lectureDetailsTabKey === publicCourseTabKey)
                return existsAndNotEmpty(order, "publicCourseParticipants");

            return existsAndNotEmpty(order, "lectureTimes")
                && _.some(order.lectureTimes, lectureTime => Boolean(lectureTime.topic));

        case progressiveStatuses.order:
            if (lectureDetailsTabKey === publicCourseTabKey)
                return true;

            return _.some(order.lectureTimes, lectureTime => Boolean(lectureTime.date));

        case progressiveStatuses.approvedOrder:
            return existsAndNotEmpty(order, "orderApproved");

        case progressiveStatuses.isExecuting: {
            if (lectureDetailsTabKey === publicCourseTabKey) {
                return true; //TODO figure how to know if executing
            }

            lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
            const tomorrowMorning = new Date();
            tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
            tomorrowMorning.setHours(0, 0, 0, 0);
            return _.some(lectureTimesDates, date => new Date(date) <= tomorrowMorning);
        }

        case progressiveStatuses.executed: {

            if (existsAndNotEmpty(order, "proformaInvoiceNumber") || existsAndNotEmpty(order, "taxInvoiceNumber")) {
                lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
                const tomorrowMorning = new Date();
                tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
                tomorrowMorning.setHours(0, 0, 0, 0);
                return _.every(lectureTimesDates, date => new Date(date) <= tomorrowMorning);
            }

            lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
            const thisMorning = new Date();
            //yesterday.setDate(yesterday.getDate() - 1);
            thisMorning.setHours(0, 0, 0, 0);
            return _.every(lectureTimesDates, date => new Date(date) <= thisMorning);
        }

        case progressiveStatuses.waitingPayment:
            return existsAndNotEmpty(order, "proformaInvoiceNumber") || existsAndNotEmpty(order, "taxInvoiceNumber");

        case progressiveStatuses.payed:
            return existsAndNotEmpty(order, "receiptNumber");

        case terminatingStatuses.cancelled:
            return order.cancelled;

        case terminatingStatuses.rejected:
            return order.rejected;

        default:
            return false;
    }
}

