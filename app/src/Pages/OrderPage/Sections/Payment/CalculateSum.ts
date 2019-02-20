import _ from "lodash";
import IOrder from "../../../../Interfaces/IOrder";

const travelKmCost = 5.34; // TODO extract to const
const vatRate = 0.17; // TODO extract to const
export default function calculateSum(selectedOrder: IOrder, updateSelectedOrder: (key: string, value: any) => void) {

    try {
        const cost = getValue(selectedOrder.cost);
        if (cost === 0)
            return;

        const travelExpenses = _.round(travelKmCost * 2 * getValue(selectedOrder.oneWayDistance), 2);
        const sum = _.round(cost + travelExpenses + getValue(selectedOrder.extraCosts), 2);
        const vat = _.round(vatRate * sum, 2);
        const totalSum = _.round(sum + vat);

        updateOrder(updateSelectedOrder, "travelExpenses", travelExpenses);
        updateOrder(updateSelectedOrder, "sum", sum);
        updateOrder(updateSelectedOrder, "vat", vat);
        updateOrder(updateSelectedOrder, "totalSum", totalSum);
    } catch (e) {
        return;
    }
}

function updateOrder(updateSelectedOrder: (key: string, value: any) => void, key: costField, value: number) {
    updateSelectedOrder(key, value === 0 ? "" : value.toString());
}

function getValue(value: string) {
    if (!value || value === "")
        return 0;

    const regexGroups = /^(\d+\.?\d*)\*?(\d*\.?\d*)?$/g.exec(value);
    if (regexGroups === null)
        throw new Error("Invalid format");

    if (regexGroups[2] === undefined)
        return parseFloat(regexGroups[1]);

    return parseFloat(regexGroups[1]) * parseFloat(regexGroups[2]);
}

type costField = "cost" | "oneWayDistance" | "vat" | "extraCosts" | "travelExpenses" | "totalSum" | "sum";