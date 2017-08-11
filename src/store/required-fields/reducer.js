import {getSelectedOrder} from "../selected/reducer";
import * as _ from "lodash";
import * as actionTypes from "./action-types";
import Immutable from "seamless-immutable";

const contact = ["organizationId", "contactFirstName", "contactLastName", "contactPhone1", "contactEmail"];
const offer = _.concat(contact, []);
const order = _.concat(offer, []);
const approvedOrder = _.concat(order, ["location", "financialContactFirstName", "financialContactLastName", "financialContactPhone1", "financialContactEmail"]);
const isExecuting = _.concat(approvedOrder, []);
const executed = _.concat(isExecuting, []);
const waitingPayment = _.concat(executed, []);
const payed = _.concat(waitingPayment, []);
const cancelled = [];

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
    showRequiredFields: true,
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
    if(!state.requiredFields.showRequiredFields)
        return [];

    const selectedOrder = getSelectedOrder(state);

    if(!selectedOrder.status)
        return state.requiredFields.contact;

    return state.requiredFields[selectedOrder.status];
}

export function getMissingFields(state){
    const requiredFields = getRequiredFields(state);
    const selectedOrder = getSelectedOrder(state);

    return _.difference(requiredFields, _.keys(selectedOrder));
}