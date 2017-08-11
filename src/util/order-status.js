import * as Immutable from "seamless-immutable";
import * as _ from "lodash";

const possibleStatus = ["contact", "offer", "order", "approvedOrder", "isExecuting", "executed",
    "waitingPayment", "payed", "cancelled", "disapproved", "followUp"];

export default function calculateOrderStatus(order) {

    let status;

    for (let i = 0; i < possibleStatus.length; i++) {
        if (meetsRequirements(order, possibleStatus[i])) {
            status = possibleStatus[i];
        } else {
            break;
        }
    }

    //TODO use status

    return Immutable.merge(order, {
        status: status
    });
}

function meetsRequirements(order, requirement) {

    let lectureTimesDates;
    let now;

    switch (requirement) {
        case "contact":
            return true;

        case "offer":
            //return _.has(order, "organizationId") &&  _.has(order, "lectureTimes") && order.lectureTimes[0].topic;
            //TODO check for organization id
            return existsAndNotEmpty(order,"lectureTimes") && order.lectureTimes[0].topic;

        case "order":
            return Boolean(order.lectureTimes[0].date);

        case "approvedOrder":
            return existsAndNotEmpty(order,"orderApproved");

        case "isExecuting":
            lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
            now = new Date();
            return _.some(lectureTimesDates, date => new Date(date) < now);

        case "executed":
            lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
            now = new Date();
            return _.every(lectureTimesDates, date => new Date(date) < now);

        case "waitingPayment":
            return existsAndNotEmpty(order,"proformaInvoiceNumber") || existsAndNotEmpty(order,"taxInvoiceNumber");

        case "payed":
            return existsAndNotEmpty(order,"receiptNumber");

        case "cancelled":
            return false;

        case "disapproved":
            return false;

        //Followup
            
        default:
            return false;


    }

}

function existsAndNotEmpty(order, key) {
    return _.has(order, key) && order[key];
}