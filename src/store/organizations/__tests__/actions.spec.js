import * as actions from '../actions'
import * as actionTypes from '../action-types'

describe('store/organizations/actions', () => {
    it('should create an action of received orders', () => {
        const organizations = {0:{}, 1:{}};
        const expectedAction = {
            type: actionTypes.RECEIVE_ORGANIZATIONS,
            payload: organizations,
        };
        expect(actions.receiveOrganizations(organizations)).toEqual(expectedAction)
    })
});
