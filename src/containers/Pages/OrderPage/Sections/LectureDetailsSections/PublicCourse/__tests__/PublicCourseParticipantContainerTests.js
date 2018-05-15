import {removeParticipant} from '../PublicCourseParticipantContainer';

describe('removeParticipant', () => {
    let updateSelectedOrder;

    beforeEach(() => {
        updateSelectedOrder = jest.fn();
    });

    it('should remove participant', () => {
        const selectedOrder = {
            publicCourseParticipants: [
                {id: 0}, {id: 3}, {id: 7}
            ]
        };
        const participantId = 0;

        removeParticipant(selectedOrder, updateSelectedOrder, participantId);

        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseParticipants",[{id: 3}, {id: 7}]);
    });

    it('should remove the middle participant', () => {
        const selectedOrder = {
            publicCourseParticipants: [
                {id: 0}, {id: 3}, {id: 7}
            ]
        };
        const participantId = 1;

        removeParticipant(selectedOrder, updateSelectedOrder, participantId);

        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseParticipants",[{id: 0}, {id: 7}]);
    });

    it('should remove the last participant', () => {
        const selectedOrder = {
            publicCourseParticipants: [
                {id: 0}, {id: 3}, {id: 7}
            ]
        };
        const participantId = 2;

        removeParticipant(selectedOrder, updateSelectedOrder, participantId);

        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseParticipants",[{id: 0}, {id: 3}]);
    });

    it('should remove the only participant', () => {
        const selectedOrder = {
            publicCourseParticipants: [
                {id: 3}
            ]
        };
        const participantId = 0;

        removeParticipant(selectedOrder, updateSelectedOrder, participantId);

        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseParticipants",[]);
    });

    it('should do nothing', () => {
        const selectedOrder = {
            publicCourseParticipants: [

            ]
        };
        const participantId = 0;

        removeParticipant(selectedOrder, updateSelectedOrder, participantId);

        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseParticipants",[]);
    });
});