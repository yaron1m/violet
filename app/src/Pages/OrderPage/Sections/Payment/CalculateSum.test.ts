import calculateSum from "./CalculateSum";
import {IState} from "../../../../Interfaces/ReduxInterfaces";

let updateAction: (key: string, newValue: any) => void;

describe("payment section - calculate sum", () => {
    beforeEach(() => {
        updateAction = jest.fn();
    });

    it("calculateSum - no cost - do nothing", async function () {
        const initialState = {
            selectedOrder: {
                order: {}
            }
        } as unknown as IState;

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction).toHaveBeenCalledTimes(0);
    });

    it("calculateSum - no cost with other fields - do nothing", async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    oneWayDistance: 100,
                    travelExpenses: 150,
                }
            }
        } as unknown as IState;

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction).toHaveBeenCalledTimes(0);
    });

    it("calculateSum - only cost - calculate cost with vat", async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    cost: "1000",
                }
            }
        } as unknown as IState;

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction).toHaveBeenCalledTimes(4);

        expect(updateAction).toHaveBeenNthCalledWith(1, "travelExpenses", "");
        expect(updateAction).toHaveBeenNthCalledWith(2, "sum", "1000");
        expect(updateAction).toHaveBeenNthCalledWith(3, "vat", "170");
        expect(updateAction).toHaveBeenNthCalledWith(4, "totalSum", "1170");
    });

    it("calculateSum - cost and oneWayDistance - calculate totalSum", async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    cost: "1000",
                    oneWayDistance: "50"
                }
            }
        } as unknown as IState;

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction).toHaveBeenCalledTimes(4);

        expect(updateAction).toHaveBeenCalledWith( "travelExpenses", "534");
        expect(updateAction).toHaveBeenCalledWith( "sum", "1534");
        expect(updateAction).toHaveBeenCalledWith( "vat", "260.78");
        expect(updateAction).toHaveBeenCalledWith( "totalSum", "1794");
    });

    it("calculateSum - cost has multiple sign - calculate totalSum", async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    cost: "1000*3",
                    oneWayDistance: "50"
                }
            }
        } as unknown as IState;

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction).toHaveBeenCalledTimes(4);

        expect(updateAction).toHaveBeenNthCalledWith(1, "travelExpenses", "534");
        expect(updateAction).toHaveBeenNthCalledWith(2, "sum", "3534");
        expect(updateAction).toHaveBeenNthCalledWith(3, "vat", "600.78");
        expect(updateAction).toHaveBeenNthCalledWith(4, "totalSum", "4134");
    });

    it("calculateSum - cost has invalid multiple sign - do nothing", async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    cost: "1000*3*5",
                    oneWayDistance: "50"
                }
            }
        } as unknown as IState;

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction).toHaveBeenCalledTimes(0);
    });

    it("calculateSum - results are rounded", async function () {
        const initialState = {
            selectedOrder: {
                order: {
                    cost: "1000",
                    oneWayDistance: "0.1"
                }
            }
        } as unknown as IState;

        calculateSum(initialState.selectedOrder.order, updateAction);

        expect(updateAction).toHaveBeenCalledTimes(4);

        expect(updateAction).toHaveBeenNthCalledWith(1, "travelExpenses", "1.07");
        expect(updateAction).toHaveBeenNthCalledWith(2, "sum", "1001.07");
        expect(updateAction).toHaveBeenNthCalledWith(3, "vat", "170.17");
        expect(updateAction).toHaveBeenNthCalledWith(4, "totalSum", "1171");
    });
});
