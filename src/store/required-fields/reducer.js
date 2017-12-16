import {getSelectedOrder, getSelectedOrganization} from "../selected/reducer";
import * as _ from "lodash";
import * as actionTypes from "./action-types";
import Immutable from "seamless-immutable";
import requiredFields from "./required-fields";
import {isEmptyValue} from "../../util/string-util";
import {mergerRequiredFields} from "./util";

export default (state = requiredFields, action = {}) => {

    switch (action.type) {
        case actionTypes.SHOW_REQUIRED_FIELDS:
            return Immutable.merge(state, {
                showRequiredFields: true,
            });

        case actionTypes.HIDE_REQUIRED_FIELDS:
            return Immutable.merge(state, {
                showRequiredFields: false,
            });

        default:
            return state
    }
}

export function getRequiredFields(state) {
    const requiredFields = getArrayOfRequiredFields(state, state.requiredFields.showRequiredFields);
    if (getSelectedOrganization(state).internalOrderIdRequired)
        return requiredFields;

    return {
        organization: requiredFields.organization,
        lectureTimes: requiredFields.lectureTimes,
        order: _.without(requiredFields.order, "internalOrderNumber")
    };
}

function getArrayOfRequiredFields(state, showRequiredFields) {
    if (!showRequiredFields)
        return {
            order: [],
            organization: [],
            lectureTimes: [],
        };

    const selectedOrder = getSelectedOrder(state);

    if (!selectedOrder.status)
        return state.requiredFields.contact;

    const statusRequiredFields = state.requiredFields[selectedOrder.status];

    if(selectedOrder.followUpRequired)
        return mergerRequiredFields(statusRequiredFields, state.requiredFields.followUpRequired);

    return statusRequiredFields;
}

export function getOrderMissingFields(state) {
    const requiredFields = getArrayOfRequiredFields(state, true);

    const selectedOrder = getSelectedOrder(state);
    const lectureTimes = selectedOrder.lectureTimes;
    const selectedOrganization = getSelectedOrganization(state);

    let orderMissingFields = getMissingFields(selectedOrder, requiredFields.order);
    //Remove "internalOrderNumber" if not required by organization
    if (!selectedOrganization.internalOrderIdRequired)
        orderMissingFields = _.without(orderMissingFields, "internalOrderNumber");

    const organizationMissingFields = getMissingFields(selectedOrganization, requiredFields.organization);

    //Remove last lecture time - the "add new" row
    const lectureTimesMissingFields = getLectureTimesMissingFields(_.dropRight(lectureTimes), requiredFields.lectureTimes);

    return _.concat(orderMissingFields, organizationMissingFields, lectureTimesMissingFields);
}

export function getMissingFields(object, required) {
    const nonEmptyKeys = _.filter(_.keys(object), key => !isEmptyValue(object, key));
    return _.difference(required, nonEmptyKeys);
}

function getLectureTimesMissingFields(lectureTimes, lectureTimesRequiredFields) {
    let lectureTimesMissingFields = [];
    for (let i = 0; i < _.size(lectureTimes); i++) {
        const diff = getMissingFields(lectureTimes[i], lectureTimesRequiredFields);
        lectureTimesMissingFields = _.concat(lectureTimesMissingFields, diff);
    }
    return lectureTimesMissingFields;
}