import _ from 'lodash';
import {isEmptyValue} from "../../../../../util/string-util";
import {updateSelectedOrder} from "../../../../../store/selected/actions";

export default async function calculateSum(selectedOrder, dispatch) {
    const order = Object.assign({}, selectedOrder);
    const travelKmCost = 5.34; //TODO extract to const
    const vatRate = 0.17; //TODO extract to const

    let cost = parseFloat(order.cost);

    if (isEmptyValue(order, "cost") || isNaN(order.cost)) {
        // Allow 1500 * 3:
        const groups = /^([0-9]*)\*([0-9]*)$/g.exec(order.cost);
        console.log(groups);
        if(groups === null)
            return;

        cost = parseFloat(groups[1]) *  parseFloat(groups[2]);
    }

    updateValue(dispatch, order, "travelExpenses",
        _.round(travelKmCost * 2 * getValue(order, "oneWayDistance"), 2));

    updateValue(dispatch, order, "sum",
        _.round(cost + getValue(order, "travelExpenses") + getValue(order, "extraCosts"), 2));

    updateValue(dispatch, order, "vat",
        _.round(vatRate * order.sum, 2));

    updateValue(dispatch, order, "totalSum",
        _.round(order.sum + order.vat));
}

function updateValue(dispatch, order, key, value) {
    if (value === 0)
        value = "";
    order[key] = value;
    dispatch(updateSelectedOrder(key, value.toString()));
}


function getValue(order, key) {
    return isEmptyValue(order, key) || isNaN(order[key]) ? 0 : parseFloat(order[key]); //TODO add numerical check
}