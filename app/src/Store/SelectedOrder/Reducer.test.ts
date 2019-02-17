import reducer from "./Reducer";
import {LOGGED_OUT} from "../Firebase/ActionTypes";
import {CLEAR_SELECTED_ORDER} from "./ActionTypes";

const payload = {
    a: 123
};

describe("selected actions - organization", () => {
    it("should return initial state", () => {
        const result = reducer();

        expect(result).toBeDefined();
        expect(result.order).toEqual({});
        expect(result.isSelectedOrder).toBeFalsy();
    });

    it("should return initial state", () => {

        const initialState = {
            order: payload,
            isSelectedOrder: true,
        };

        const action = {
            type: LOGGED_OUT,
        };

        const result = reducer(initialState, action);

        expect(result).toBeDefined();
        expect(result.order).toEqual({});
        expect(result.isSelectedOrder).toBeFalsy();
    });

    it("should return initial state", () => {
        const initialState = {
            order: payload,
            isSelectedOrder: true,
        };

        const action = {
            type: CLEAR_SELECTED_ORDER,
        };

        const result = reducer(initialState, action);

        expect(result).toBeDefined();
        expect(result.order).toEqual({});
        expect(result.isSelectedOrder).toBeFalsy();
    });
});