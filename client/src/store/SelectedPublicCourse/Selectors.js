import {getOrders} from "../orders/selectors";
import _ from "lodash";
import {getOrganizationById} from "../organizations/reducer";
import {getLabels, getStatusLabel} from "../Labels/Reducer";
import {moneyFormat} from "../../util/StringUtil";

export function getSelectedPublicCourse(state) {
    return state.selectedPublicCourse.publicCourse;
}

//TODO test
export function getSelectedPublicCourseLectures(state) {
    const course = getSelectedPublicCourse(state);
    if (!course)
        return [];

    return _.orderBy(course.lectures, lecture => lecture.date);
}

export function getSelectedPublicCourseLecture(state, lectureId) {
    return state.selectedPublicCourse.publicCourse.lectures[lectureId];
}

export function isSelectedPublicCourse(state) {
    return state.selectedPublicCourse.isSelectedPublicCourse;
}

//TODO test
function getSelectedCourseParticipantsAndOrders(state) {
    const orders = getOrders(state);
    const courseId = getSelectedPublicCourse(state).id;
    const publicCourseOrders = _.filter(orders, order => order.publicCourseId === courseId);
    return _.flatMap(publicCourseOrders,
        order => _.map(order.publicCourseParticipants, participant => {
            return {
                order,
                participant
            }
        })
    )
}

//TODO test
export function getSelectedPublicCourseParticipants(state) {
    const ordersAndParticipants = getSelectedCourseParticipantsAndOrders(state);
    return _.map(ordersAndParticipants, ({order, participant}) => {
        const organizationName = getOrganizationById(state, order.organizationId).organizationName;
        return {
            participantFirstName: participant.participantFirstName,
            participantLastName: participant.participantLastName,
            lecturesAttending: participant.lecturesAttending.length,
            participantCost: moneyFormat(participant.participantCost, getLabels(state).currencyIcon),
            orderId: order.id,
            status: getStatusLabel(state, order.status),
            organizationName,
        }
    });
}

//TODO test
export function getLecturesParticipantsCount(state) {
    const lectures = getSelectedPublicCourseLectures(state);
    const ordersAndParticipants = getSelectedCourseParticipantsAndOrders(state);

    const participantsCount = {};
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
            income: lecture.price * participantsCount[lecture.id],
        }
    });
}