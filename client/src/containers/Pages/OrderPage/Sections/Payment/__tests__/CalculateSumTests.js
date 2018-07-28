import calculateSum from "../CalculateSum";

let updateAction;

describe('payment section - calculate sum', () => {
    beforeEach(() => {
        updateAction = jest.fn();
    });

    it('calculateSum - no cost - do nothing', async function () {
        const initialState = {
            selectedOrder: {
                order: {}
            }
        };

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction.mock.calls).toHaveLength(0);
    });

    it('calculateSum - no cost with other fields - do nothing', async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    oneWayDistance: 100,
                    travelExpenses: 150,
                }
            }
        };

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction.mock.calls).toHaveLength(0);
    });

    it('calculateSum - only cost - calculate cost with vat', async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    cost: "1000",
                }
            }
        };

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction.mock.calls).toHaveLength(4);

        expect(updateAction.mock.calls[0]).toEqual(["travelExpenses", ""]);
        expect(updateAction.mock.calls[1]).toEqual(["sum", "1000"]);
        expect(updateAction.mock.calls[2]).toEqual(["vat", "170"]);
        expect(updateAction.mock.calls[3]).toEqual(["totalSum", "1170"]);
    });

    it('calculateSum - cost and oneWayDistance - calculate totalSum', async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    cost: "1000",
                    oneWayDistance: "50"
                }
            }
        };

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction.mock.calls).toHaveLength(4);

        expect(updateAction.mock.calls[0]).toEqual(["travelExpenses", "534"]);
        expect(updateAction.mock.calls[1]).toEqual(["sum", "1534"]);
        expect(updateAction.mock.calls[2]).toEqual(["vat", "260.78"]);
        expect(updateAction.mock.calls[3]).toEqual(["totalSum", "1795"]);
    });

    it('calculateSum - cost has multiple sign - calculate totalSum', async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    cost: "1000*3",
                    oneWayDistance: "50"
                }
            }
        };

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction.mock.calls).toHaveLength(4);

        expect(updateAction.mock.calls[0]).toEqual(["travelExpenses", "534"]);
        expect(updateAction.mock.calls[1]).toEqual(["sum", "3534"]);
        expect(updateAction.mock.calls[2]).toEqual(["vat", "600.78"]);
        expect(updateAction.mock.calls[3]).toEqual(["totalSum", "4135"]);
    });

    it('calculateSum - cost has invalid multiple sign - do nothing', async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    cost: "1000*3*5",
                    oneWayDistance: "50"
                }
            }
        };

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction.mock.calls).toHaveLength(0);
    });

    it('calculateSum - results are rounded', async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    cost: "1000",
                    oneWayDistance: "0.1"
                }
            }
        };

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction.mock.calls).toHaveLength(4);

        expect(updateAction.mock.calls[0]).toEqual(["travelExpenses", "1.07"]);
        expect(updateAction.mock.calls[1]).toEqual(["sum", "1001.07"]);
        expect(updateAction.mock.calls[2]).toEqual(["vat", "170.18"]);
        expect(updateAction.mock.calls[3]).toEqual(["totalSum", "1171"]);
    });
});
