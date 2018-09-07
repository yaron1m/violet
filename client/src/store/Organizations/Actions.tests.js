import * as actions from './Actions';
import * as actionTypes from './ActionTypes';

describe('organizations actions', () => {
    it('should create an action of received organizations', () => {
        const organizations = {50: {}, 51: {}};

        const result = actions.receiveOrganizations(organizations);
        expect(result).toEqual({
            type: actionTypes.RECEIVE_ORGANIZATIONS,
            payload: organizations,
        })
    })
});
