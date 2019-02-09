import _ from 'lodash';
import {getOrderStatusLabel} from "../Labels/Selectors";
import {getOrganizationById} from "../Organizations/Selectors";
import {getLabels} from "../Labels/Selectors";
import {Status} from "../../Util/Constants/Status";
import {isEmptyValue} from "../../Util/StringUtil";
import {isPublicCourseOrder} from "../SelectedOrder/Selectors";
import {getPublicCourseById} from "../PublicCourses/Selectors";
import {IState} from '../../Interfaces/ReduxInterfaces';
import IOrder from '../../Interfaces/IOrder';
import {getOrders} from './Selectors';

interface IActionRequiredOrder {
    id: number;
    createdDate: string;
    organizationName: string;
    status: string;
    issue: string;
}

export default function getActionRequiredOrdersArray(state: IState) {
    const orders = getOrders(state);
    const issues = getLabels(state).pages.actionRequiredPage.issues;

    const now = new Date();

    const result: IActionRequiredOrder[] = [];

    _.forEach(orders, function checkActionRequired(order) {
            if (order.followUpRequired) {
                if (new Date(order.followUpDate) < now)
                    addOrderToResult(state, result, order, issues.followUpRequired
                        + " - " + new Date(order.followUpDate).toLocaleDateString());
                return;
            }

            switch (order.status) {

                case Status.contact:
                case Status.offer:
                    if (addTwoWeeks(order.createdDate) < now)
                        addOrderToResult(state, result, order, issues.twoWeeksPassedFromCreation);
                    return;

                case Status.order: {

                    let firstLectureTimeDate;
                    if (isPublicCourseOrder(order)) {
                        const publicCourse = getPublicCourseById(state, order.publicCourseId.toString());
                        if (!publicCourse) // Data did not load yet
                            return;
                        firstLectureTimeDate = _.sortBy(publicCourse.lectures, lecture => new Date(lecture.date))[0].date;
                    } else {
                        firstLectureTimeDate = _.sortBy(order.lectureTimes, time => new Date(time.date))[0].date;
                    }

                    if (new Date(firstLectureTimeDate) < addTwoWeeks(now.toJSON())) {
                        addOrderToResult(state, result, order, issues.noOrderApproval);
                        return;
                    }

                    if (addTwoWeeks(order.createdDate) < now)
                        addOrderToResult(state, result, order, issues.twoWeeksPassedFromCreation);
                    return;
                }

                case Status.approvedOrder:
                case Status.isExecuting:
                case Status.executed: {
                    let lastLectureTimeDate;
                    if (isPublicCourseOrder(order)) {
                        const publicCourse = getPublicCourseById(state, order.publicCourseId.toString());
                        if (!publicCourse) // Data did not load yet
                            return;
                        lastLectureTimeDate = _.sortBy(publicCourse.lectures, lecture => -new Date(lecture.date))[0].date;
                    } else {
                        lastLectureTimeDate = _.sortBy(order.lectureTimes, time => -new Date(time.date))[0].date;
                    }

                    if (isEmptyValue(order, "proformaInvoiceNumber") && new Date(lastLectureTimeDate) < now) {
                        addOrderToResult(state, result, order, issues.executedAndNoInvoice);
                        return;
                    }
                    return;
                }

                case Status.waitingPayment:
                    if (new Date(order.expectedPayDate) < now)
                        addOrderToResult(state, result, order, issues.notPaidOnTime);
                    return;

                default:
                    return;
            }
        }
    );

    return result;
}

function addOrderToResult(state: IState, result: IActionRequiredOrder[], order: IOrder, issue: string) {
    result.push({
        id: order.id,
        createdDate: order.createdDate,
        issue,
        organizationName: getOrganizationById(state, order.organizationId.toString()).organizationName,
        status: getOrderStatusLabel(state, order),
    });
}

function addTwoWeeks(dateString: string) {
    const twoWeeks = 12096e5;
    return new Date(new Date(dateString).valueOf() + twoWeeks);
}
