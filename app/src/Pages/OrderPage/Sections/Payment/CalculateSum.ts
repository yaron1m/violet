import _ from 'lodash';
import {isEmptyValue} from "../../../../Util/StringUtil";
import IOrder from '../../../../Interfaces/IOrder';

export default function calculateSum(selectedOrder: IOrder, updateSelectedOrder: (key: string, value: any) => void) {
    const order = Object.assign({}, selectedOrder);
    const travelKmCost = 5.34; //TODO extract to const
    const vatRate = 0.17; //TODO extract to const

    let cost = parseFloat(order.cost);

    if (isEmptyValue(order, "cost") || isNaN(Number(order.cost))) {
        // Allow 1500 * 3:
        //TODO support distance calculations as well
        const groups = /^([0-9]*)\*([0-9]*)$/g.exec(order.cost);
        if (groups === null)
            return;

        cost = parseFloat(groups[1]) * parseFloat(groups[2]);
    }

    updateValue(updateSelectedOrder, order, "travelExpenses",
        _.round(travelKmCost * 2 * getValue(order, "oneWayDistance"), 2));

    updateValue(updateSelectedOrder, order, "sum",
        _.round(cost + getValue(order, "travelExpenses") + getValue(order, "extraCosts"), 2));

    updateValue(updateSelectedOrder, order, "vat",
        _.round(vatRate * parseInt(order.sum), 2));

    updateValue(updateSelectedOrder, order, "totalSum",
        _.round(parseInt(order.sum) + parseInt(order.vat)));
}

function updateValue(updateSelectedOrder: (key: string, value: any) => void, order: IOrder, key: string, value: any) {
    if (value === 0)
        value = "";
    // @ts-ignore
    order[key] = value;
    updateSelectedOrder(key, value.toString());
}

function getValue(order: IOrder, key:string) {
    // @ts-ignore
    return isEmptyValue(order, key) || isNaN(order[key]) ? 0 : parseFloat(order[key]); //TODO add numerical check
}