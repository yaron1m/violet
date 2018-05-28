import React from 'react';
import * as actions from "../actions";
import * as actionTypes from "../action-types";
import {CLEAR_SELECTED_ORDER} from "../../SelectedOrder/ActionTypes";

describe('selected actions - clear', () => {

    it('clearSelected - valid - action', () => {
        expect(actions.clearSelected().type).toBe(actionTypes.CLEAR_SELECTED);
    });

    it('clearSelected - valid - action', () => {
        expect(actions.clearSelectedOrder().type).toBe(CLEAR_SELECTED_ORDER);
    });

});