import * as actions from '../Actions'
import * as actionTypes from '../ActionTypes'

describe('store/organizations/actions', () => {
    it('should create an action of received orders', () => {
        const organizations = {0: {}, 1: {}};
        const expectedAction = {
            type: actionTypes.RECEIVE_ORGANIZATIONS,
            payload: organizations,
        };
        expect(actions.receiveOrganizations(organizations)).toEqual(expectedAction)
    })
});
