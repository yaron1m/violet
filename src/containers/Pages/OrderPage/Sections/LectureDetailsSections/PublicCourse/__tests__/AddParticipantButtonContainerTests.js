import {addNewParticipant} from '../AddParticipantButtonContainer';

describe('addNewParticipant', () => {
    let updateSelectedOrder;

    beforeEach(() => {
        updateSelectedOrder = jest.fn();
    });

    it('should add new participant to existing participants', () => {
        const selectedOrder = {
            publicCourseParticipants: [
                {id: 0}, {id: 3}, {id: 7}
            ]
        };

        addNewParticipant(selectedOrder, updateSelectedOrder,);

        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseParticipants", [{id: 0}, {id: 3}, {id: 7}, {}]);
    });

    it('should add new participant when there are no participants', () => {
        const selectedOrder = {};

        addNewParticipant(selectedOrder, updateSelectedOrder,);

        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseParticipants", [{}]);
    });

    it('should add new participant when there are no participants', () => {
        const selectedOrder = {
            publicCourseParticipants: []
        };

        addNewParticipant(selectedOrder, updateSelectedOrder,);

        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseParticipants", [{}]);
    });
});