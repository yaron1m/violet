import _ from 'lodash';
import {isEmptyValue} from "../../../../../util/string-util";
import {updateSelectedOrder} from "../../../../../store/selected/actions";

export default async function calculateSum() {
    const order = Object.assign({}, this.props.selectedOrder);
    const travelKmCost = 5.34; //TODO extract to const
    const vatRate = 0.17; //TODO extract to const

    if (isEmptyValue(order, "cost"))
        return;

    order.travelExpenses = travelKmCost * getValue(order,"oneWayDistance");
    if(order.travelExpenses !== 0 )
        this.props.dispatch(updateSelectedOrder("travelExpenses", order.travelExpenses.toString() ));

    order.sum = _.round(
        getValue(order, "cost") + getValue(order, "travelExpenses") + getValue(order, "extraCosts"),2);
    this.props.dispatch(updateSelectedOrder("sum", order.sum.toString()));

    order.vat = _.round(vatRate * order.sum, 2);
    this.props.dispatch(updateSelectedOrder("vat", order.vat.toString()));

    order.totalSum = _.round(order.sum + order.vat,);
    this.props.dispatch(updateSelectedOrder("totalSum", order.totalSum.toString()));
}

function getValue(order, key) {
    return isEmptyValue(order, key) ? 0 : parseFloat(order[key]); //TODO add numerical check
}