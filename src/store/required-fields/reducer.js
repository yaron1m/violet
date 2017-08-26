import {getSelectedOrder, getSelectedOrganization} from "../selected/reducer";
import * as _ from "lodash";
import * as actionTypes from "./action-types";
import Immutable from "seamless-immutable";

function arrayMerge(objValue, srcValue) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

const contact = {
    order: ["contactFirstName", "contactLastName", "contactPhone1", "contactEmail"],
    organization: ["organizationName"],
    lectureTimes: [],
};

const offer = _.mergeWith(_.cloneDeep(contact), {
    lectureTimes: ["topic"],
}, arrayMerge);

const order = _.mergeWith(_.cloneDeep(offer), {
    lectureTimes: ["date", "startTime", "endTime"],
}, arrayMerge);

const approvedOrder = _.mergeWith(_.cloneDeep(order), {
    order: ["street", "streetNumber", "city", "financialContactFirstName", "financialContactLastName", "financialContactPhone1",
        "financialContactEmail", "amount"],
    organization: ["companyId", "paymentConditions"],
}, arrayMerge);


const isExecuting = _.mergeWith(_.cloneDeep(approvedOrder), {}, arrayMerge);
const executed = _.mergeWith(_.cloneDeep(isExecuting), {}, arrayMerge);
const waitingPayment = _.mergeWith(_.cloneDeep(executed), {}, arrayMerge);
const payed = _.mergeWith(_.cloneDeep(waitingPayment), {}, arrayMerge);
const cancelled = {
    order: ["cancellationReason"],
    organization: [],
    lectureTimes: [],
};

const initialState = Immutable({
    contact,
    offer,
    order,
    approvedOrder,
    isExecuting,
    executed,
    waitingPayment,
    payed,
    cancelled,
    showRequiredFields: false,
});

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
    const nonEmptyKeys = _.filter(_.keys(object), key => object[key]);
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