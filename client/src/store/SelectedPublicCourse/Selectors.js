import {getOrders} from "../orders/selectors";
import _ from "lodash";
import {getOrganizationById} from "../organizations/reducer";
import {getLabels, getStatusLabel} from "../Labels/Reducer";
import {moneyFormat} from "../../util/StringUtil";

export function getSelectedPublicCourse(state) {
    return state.selectedPublicCourse.publicCourse;
}

export function getSelectedPublicCourseLecture(state, lectureId) {
    return state.selectedPublicCourse.publicCourse.lectures[lectureId];
}

export function isSelectedPublicCourse(state) {
    return state.selectedPublicCourse.isSelectedPublicCourse;
}

//TODO test
export function getSelectedPublicCourseParticipants(state) {
    const orders = getOrders(state);
    const courseId = getSelectedPublicCourse(state).id;
    const publicCourseOrders = _.filter(orders, order => order.publicCourseId === courseId);
    return _.flatMap(publicCourseOrders,
        order => _.map(order.publicCourseParticipants, participant => {
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
        })
    );
}