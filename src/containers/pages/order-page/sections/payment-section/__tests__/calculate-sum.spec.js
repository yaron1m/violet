import calculateSum from "../calculate-sum";
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('payment section - calculate sum', () => {
    it('calculateSum - no cost - do nothing', async function () {
        const initialState = {
            selected: {
                order: {}
            }
        };
        const store = mockStore(initialState);

        await calculateSum(initialState.selected.order, store.dispatch);

        const actions = store.getActions();
        expect(actions.length).toBe(0);
    });

    it('calculateSum - no cost with other fields - do nothing', async function () {
        const initialState = {
            selected: {
                order: {
                    oneWayDistance: 100,
                    travelExpenses: 150,
                }
            }
        };
        const store = mockStore(initialState);

        await calculateSum(initialState.selected.order, store.dispatch);

        const actions = store.getActions();
        expect(actions.length).toBe(0);
    });

    it('calculateSum - only cost - calculate cost with vat', async function () {
        const initialState = {
            selected: {
                order: {
                    cost: "1000",
                }
            }
        };
        const store = mockStore(initialState);

        await calculateSum(initialState.selected.order, store.dispatch);

        const actions = store.getActions();
        expect(actions.length).toBe(4);
        expect(actions[0].payload.travelExpenses).toBe("");
        expect(actions[1].payload.sum).toBe("1000");
        expect(actions[2].payload.vat).toBe("170");
        expect(actions[3].payload.totalSum).toBe("1170");
    });

    it('calculateSum - cost and oneWayDistance - calculate totalSum', async function () {
        const initialState = {
            selected: {
                order: {
                    cost: "1000",
                    oneWayDistance: "50"
                }
            }
        };
        const store = mockStore(initialState);

        await calculateSum(initialState.selected.order, store.dispatch);

        const actions = store.getActions();
        expect(actions.length).toBe(4);
        expect(actions[0].payload.travelExpenses).toBe("534");
        expect(actions[1].payload.sum).toBe("1534");
        expect(actions[2].payload.vat).toBe("260.78");
        expect(actions[3].payload.totalSum).toBe("1795");
    });
});
