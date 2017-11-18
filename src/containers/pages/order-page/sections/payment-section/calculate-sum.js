import _ from 'lodash';
import {isEmptyValue} from "../../../../../util/string-util";
import {updateSelectedOrder} from "../../../../../store/selected/actions";

export default async function calculateSum() {
    const order = Object.assign({}, this.props.selectedOrder);
    const travelKmCost = 5.34; //TODO extract to const
    const vatRate = 0.17; //TODO extract to const

    if (isEmptyValue(order, "cost"))
        return;

    updateValue.bind(this)(order, "travelExpenses",
        _.round(travelKmCost * getValue(order, "oneWayDistance"), 2));

    updateValue.bind(this)(order, "sum",
        _.round(getValue(order, "cost") + getValue(order, "travelExpenses") + getValue(order, "extraCosts"), 2));

    updateValue.bind(this)(order, "vat",
        _.round(vatRate * order.sum, 2));

    updateValue.bind(this)(order, "totalSum",
        _.round(order.sum + order.vat));
}

function updateValue(order, key, value) {
    if(value === 0)
        value = "";
    order[key] = value;
    this.props.dispatch(updateSelectedOrder(key, value.toString()));
}


function getValue(order, key) {
    return isEmptyValue(order, key) ? 0 : parseFloat(order[key]); //TODO add numerical check
}