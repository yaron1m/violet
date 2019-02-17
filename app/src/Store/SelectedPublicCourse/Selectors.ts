import {getOrders} from "../Orders/Selectors";
import _ from "lodash";
import {getOrganizationById} from "../Organizations/Selectors";
import {getLabels, getStatusLabel} from "../Labels/Selectors";
import {isEmptyValue, moneyFormat} from "../../Util/StringUtil";
import {IState} from "../../Interfaces/ReduxInterfaces";
import {toMutable} from "../../Util/ObjectUpdater";

export function getSelectedPublicCourse(state: IState) {
    return toMutable(state.selectedPublicCourse).publicCourse;
}

export function getSelectedPublicCourseLectures(state: IState) {
    const course = getSelectedPublicCourse(state);
    if (!course)
        return [];

    return _.orderBy(_.filter(course.lectures, x => x.active), lecture => lecture.date);
}

export function getSelectedPublicCourseLecture(state: IState, lectureId: number) {
    return state.selectedPublicCourse.publicCourse.lectures[lectureId];
}

export function isSelectedPublicCourse(state: IState) {
    return state.selectedPublicCourse.isSelectedPublicCourse;
}

export function getSelectedCourseParticipantsAndOrders(state: IState) {
    const orders = getOrders(state);
    const courseId = getSelectedPublicCourse(state).id;
    const publicCourseOrders = _.filter(orders, order => order.publicCourseId === courseId);
    return _.flatMap(publicCourseOrders,
        order => _.map(order.publicCourseParticipants, participant => {
            return {
                order,
                participant
            };
        })
    );
}

export interface ISelectedPublicCourseParticipantsSummary {
    participantFirstName: string;
    participantLastName: string;
    numberOfLecturesAttending: number;
    participantCost: string;
    proformaInvoiceNumber: string;
    orderId: number;
    status: string;
    organizationName: string;
}

export function getSelectedPublicCourseParticipants(state: IState) {
    const ordersAndParticipants = getSelectedCourseParticipantsAndOrders(state);
    return _.map(ordersAndParticipants, ({order, participant}) => {
        const organizationName = getOrganizationById(state, order.organizationId.toString()).organizationName;
        return {
            participantFirstName: participant.participantFirstName,
            participantLastName: participant.participantLastName,
            numberOfLecturesAttending: participant.lecturesAttending ? participant.lecturesAttending.length : 0,
            participantCost: moneyFormat(participant.participantCost, getLabels(state).currencyIcon),
            proformaInvoiceNumber: order.proformaInvoiceNumber,
            orderId: order.id,
            status: getStatusLabel(state, order.status),
            organizationName,
        } as ISelectedPublicCourseParticipantsSummary;
    });
}

export function getLecturesDetails(state: IState) {
    const lectures = getSelectedPublicCourseLectures(state);
    const ordersAndParticipants = getSelectedCourseParticipantsAndOrders(state);

    const participantsCount: { [lectureId: number]: number } = {};
    _.map(lectures, lecture => participantsCount[lecture.id] = 0);

    _.map(ordersAndParticipants, ({participant}) => {
        _.map(participant.lecturesAttending, lectureId => participantsCount[lectureId] += 1);
    });

    return _.map(lectures, lecture => {
        return {
            date: lecture.date,
            topic: lecture.topic,
            participantsCount: participantsCount[lecture.id],
            price: lecture.price,
            income: isEmptyValue(lecture, "price") ? 0 : parseInt(lecture.price) * participantsCount[lecture.id],
        };
    });
}