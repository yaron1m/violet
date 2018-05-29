import {getSelectedOrganization} from "../../SelectedOrganization/Selectors";
import * as _ from "lodash";
import requiredFields from "./RequiredFieldsByStatus";
import {hasMissingFields, isRightTabKey, mergerRequiredFields} from "./Util";
import {shouldShowRequiredFields} from "../reducer";
import {
    internalTabKey,
    publicCourseTabKey
} from "../../../containers/Pages/OrderPage/Sections/LectureDetailsSections/LecturesDetailsSectionContainer";
import {getSelectedOrder} from "../../SelectedOrder/Selectors";

export function getRequiredFieldsObject(state) {
    return getRequiredFieldsStateObject(state, shouldShowRequiredFields(state))
}

function getRequiredFieldsStateObject(state, showRequiredFields) {
    const selectedOrder = getSelectedOrder(state);
    const requiredFieldsByEntity = getRequiredFieldsByEntity(selectedOrder, showRequiredFields);

    return removeInternalOrderNumber(requiredFieldsByEntity, getSelectedOrganization(state));
}

export function isOrderMissingFields(state) {
    const requiredFieldsObject = getRequiredFieldsStateObject(state, true);

    if (hasMissingFields(getSelectedOrder(state), requiredFieldsObject.order))
        return true;

    if (hasMissingFields(getSelectedOrganization(state), requiredFieldsObject.organization))
        return true;

    if (isRightTabKey(getSelectedOrder(state), internalTabKey, true))
        if (isElementInArrayMissingFields(getSelectedOrder(state).lectureTimes, requiredFieldsObject.lectureTimes))
            return true;

    if (isRightTabKey(getSelectedOrder(state), publicCourseTabKey))
        if (isElementInArrayMissingFields(getSelectedOrder(state).publicCourseParticipants, requiredFieldsObject.publicCourse))
            return true;

    return false;
}

function removeInternalOrderNumber(requiredFieldsByEntity, selectedOrganization) {
    if (selectedOrganization.internalOrderIdRequired)
        return requiredFieldsByEntity;

    return {
        ...requiredFieldsByEntity,
        order: _.without(requiredFieldsByEntity.order, "internalOrderNumber")
    };
}

function getRequiredFieldsByEntity(selectedOrder, showRequiredFields) {
    if (!showRequiredFields)
        return {
            order: [],
            organization: [],
            lectureTimes: [],
            publicCourse: [],
        };

    if (!selectedOrder.status)
        return requiredFields.contact;

    const statusRequiredFields = requiredFields[selectedOrder.status];

    if (selectedOrder.followUpRequired)
        return mergerRequiredFields(statusRequiredFields, requiredFields.followUpRequired);

    return statusRequiredFields;
}

function isElementInArrayMissingFields(array, lectureTimesRequiredFields) {

    for (let i = 0; i < _.size(array); i++) {
        if (hasMissingFields(array[i], lectureTimesRequiredFields))
            return true;
    }
    return false;
}