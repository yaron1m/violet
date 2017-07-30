import * as actions from '../actions'
import * as actionTypes from '../action-types'

describe('store/drawer/actions', () => {
    it('should create an action to flip drawer state', () => {
        const expectedAction = {
            type: actionTypes.CHANGE_DRAWER_STATE,
        };
        expect(actions.changeDrawerState()).toEqual(expectedAction)
    })
});
