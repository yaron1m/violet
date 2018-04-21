import {getSelectedOrder, getSelectedOrganization} from "../selected/reducer";
import * as _ from "lodash";
import {getRequiredFieldsFromState} from "./reducer";
import requiredFields from "./required-fields";
import {hasMissingFields, mergerRequiredFields} from "./util";

export function getRequiredFieldsObject(state) {
    return getRequiredFieldsByObject(state, getRequiredFieldsFromState(state).showRequiredFields)
}

function getRequiredFieldsByObject(state, showRequiredFields) {
    const requireFields = getRequiredFieldsFromState(state);
    const selectedOrder = getSelectedOrder(state);
    const requiredFieldsByEntity = getRequiredFieldsByEntity(requireFields, selectedOrder, showRequiredFields);

    return removeInternalOrderNumber(requiredFieldsByEntity, getSelectedOrganization(state));
}

export function isOrderMissingFields(state) {
    const requiredFieldsObject = getRequiredFieldsByObject(state, true);

    if (hasMissingFields(getSelectedOrder(state), requiredFieldsObject.order))
        return true;

    if (hasMissingFields(getSelectedOrganization(state), requiredFieldsObject.organization))
        return true;

    if (isLectureTimesMissingFields(getSelectedOrder(state).lectureTimes, requiredFieldsObject.lectureTimes))
        return true;

    return false;
}


// function getLectrueDetailsSectionFields(){
//
// }


function removeInternalOrderNumber(requiredFieldsByEntity, selectedOrganization) {
    if (selectedOrganization.internalOrderIdRequired)
        return requiredFieldsByEntity;

    return {
        ...requiredFieldsByEntity,
        order: _.without(requiredFieldsByEntity.order, "internalOrderNumber")
    };
}

function getRequiredFieldsByEntity(requireFields, selectedOrder, showRequiredFields) {
    if (!showRequiredFields)
        return {
            order: [],
            organization: [],
            lectureTimes: [],
            publicCourse: [],
        };

    if (!selectedOrder.status)
        return requireFields.contact;

    const statusRequiredFields = requireFields[selectedOrder.status]; //TODO Remove the long list from state and store it statically

    if (selectedOrder.followUpRequired)
        return mergerRequiredFields(statusRequiredFields, requiredFields.followUpRequired);

    return statusRequiredFields;
}

function isLectureTimesMissingFields(lectureTimes, lectureTimesRequiredFields) {
    for (let i = 0; i < _.size(lectureTimes); i++) {
        if (hasMissingFields(lectureTimes[i], lectureTimesRequiredFields))
            return true;
    }
    return false;
}