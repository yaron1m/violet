import {getSelectedOrder, getSelectedOrganization} from "../selected/reducer";
import * as _ from "lodash";
import * as actionTypes from "./action-types";
import Immutable from "seamless-immutable";
import initialState from "./initial-state";
import {isEmptyValue} from "../../util/string-util";

export default (state = initialState, action = {}) => {

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
    return getArrayOfRequiredFields(state, state.requiredFields.showRequiredFields);
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

    return state.requiredFields[selectedOrder.status];
}

export function getOrderMissingFields(state) {
    const requiredFields = getArrayOfRequiredFields(state, true);

    const selectedOrder = getSelectedOrder(state);
    const lectureTimes = selectedOrder.lectureTimes;
    const selectedOrganization = getSelectedOrganization(state);

    const orderMissingFields = getMissingFields(selectedOrder, requiredFields.order);
    const organizationMissingFields = getMissingFields(selectedOrganization, requiredFields.organization);
    //Remove last lecture time - add new line row
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