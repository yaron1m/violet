import React from 'react';
import * as actions from "../actions";
import * as actionTypes from "../action-types";

describe('selected actions - clear', () => {

    it('clearSelected - valid - action', () => {
        expect(actions.clearSelected().type).toBe(actionTypes.CLEAR_SELECTED);
    });

    it('clearSelected - valid - action', () => {
        expect(actions.clearSelectedOrder().type).toBe(actionTypes.CLEAR_SELECTED_ORDER);
    });

});