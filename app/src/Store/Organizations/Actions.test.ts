import * as actions from './Actions';
import * as actionTypes from './ActionTypes';
import IOrganization from '../../Interfaces/IOrganization';

describe('organizations actions', () => {
    it('should create an action of received organizations', () => {
        const organizations = {50: {} as IOrganization, 51: {} as IOrganization};

        const result = actions.receiveOrganizations(organizations);
        expect(result).toEqual({
            type: actionTypes.RECEIVE_ORGANIZATIONS,
            payload: organizations,
        })
    })
});
