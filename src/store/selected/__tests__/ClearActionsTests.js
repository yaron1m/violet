import React from 'react';
import {CLEAR_SELECTED_ORDER} from "../../SelectedOrder/ActionTypes";
import {clearSelectedOrder} from "../../SelectedOrder/Actions";

describe('selected actions - clear', () => {

    it('clearSelected - valid - action', () => {
        expect(clearSelectedOrder().type).toBe(CLEAR_SELECTED_ORDER);
    });

});