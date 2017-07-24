import * as actions from '../actions'
import * as actionTypes from '../action-types'

describe('store/offered-lectures/actions', () => {
    it('should create an action to add offered lectures to store', () => {
        const offeredLectures = 'Finish docs';
        const expectedAction = {
            type: actionTypes.RECEIVE_OFFERED_LECTURES,
            payload: offeredLectures,
        };
        expect(actions.receiveOfferedLectures(offeredLectures)).toEqual(expectedAction)
    })
});
