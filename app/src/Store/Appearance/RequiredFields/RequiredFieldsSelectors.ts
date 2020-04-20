import {getSelectedOrganization} from "../../SelectedOrganization/Selectors";
import * as _ from "lodash";
import requiredFields from "./RequiredFieldsByStatus";
import {hasMissingFields, IRequiredFields, isRightTabKey, mergerRequiredFields} from "./Util";
import {shouldShowRequiredFields} from "../Selectors";
import {getSelectedOrder} from "../../SelectedOrder/Selectors";
import {IState} from "../../../Interfaces/ReduxInterfaces";
import {IOrder, IOrganization, TabKey} from "@violet/common";

export function getRequiredFieldsObject(state: IState) {
    return getRequiredFieldsStateObject(state, shouldShowRequiredFields(state));
}

function getRequiredFieldsStateObject(state: IState, showRequiredFields: boolean) {
    const selectedOrder = getSelectedOrder(state);
    const requiredFieldsByEntity = getRequiredFieldsByEntity(selectedOrder, showRequiredFields);

    return removeOrganizationBasedFields(requiredFieldsByEntity, getSelectedOrganization(state));
}

export function isOrderMissingFields(state: IState) {
    const requiredFieldsObject = getRequiredFieldsStateObject(state, true);

    if (hasMissingFields(getSelectedOrder(state), requiredFieldsObject.order))
        return true;

    if (hasMissingFields(getSelectedOrganization(state), requiredFieldsObject.organization))
        return true;

    if (isRightTabKey(getSelectedOrder(state), TabKey.internalTabKey, true)) {
        if (isElementInArrayMissingFields(getSelectedOrder(state).lectureTimes, requiredFieldsObject.lectureTimes))
            return true;

        if (hasMissingFields(getSelectedOrder(state), requiredFieldsObject.internalOrder))
            return true;
    }

    if (isRightTabKey(getSelectedOrder(state), TabKey.publicCourseTabKey))
        if (isElementInArrayMissingFields(getSelectedOrder(state).publicCourseParticipants, requiredFieldsObject.publicCourse))
            return true;

    return false;
}

function removeOrganizationBasedFields(requiredFieldsByEntity: IRequiredFields, selectedOrganization: IOrganization) {
    if (selectedOrganization.internalOrderIdRequired && selectedOrganization.externalInvoiceHandler)
        return requiredFieldsByEntity;

    if (selectedOrganization.internalOrderIdRequired && !selectedOrganization.externalInvoiceHandler) {
        return {
            ...requiredFieldsByEntity,
            order: _.without(requiredFieldsByEntity.order, "externalInvoiceSent")
        };
    }

    if (!selectedOrganization.internalOrderIdRequired && selectedOrganization.externalInvoiceHandler) {
        return {
            ...requiredFieldsByEntity,
            order: _.without(requiredFieldsByEntity.order, "internalOrderNumber")
        };
    }

    return {
        ...requiredFieldsByEntity,
        order: _.without(requiredFieldsByEntity.order, "internalOrderNumber", "externalInvoiceSent")
    };
}

function getRequiredFieldsByEntity(selectedOrder: IOrder, showRequiredFields: boolean): IRequiredFields {
    if (!showRequiredFields)
        return {
            order: [],
            organization: [],
            lectureTimes: [],
            publicCourse: [],
            internalOrder: [],
        };

    if (!selectedOrder.status)
        return requiredFields.contact;

    const statusRequiredFields = requiredFields[selectedOrder.status];

    if (selectedOrder.followUpRequired)
        return mergerRequiredFields(statusRequiredFields, requiredFields.followUpRequired);

    return statusRequiredFields;
}

function isElementInArrayMissingFields(array: any, lectureTimesRequiredFields: string[]) {
    for (let i = 0; i < _.size(array); i++) {
        if (hasMissingFields(array[i], lectureTimesRequiredFields))
            return true;
    }
    return false;
}