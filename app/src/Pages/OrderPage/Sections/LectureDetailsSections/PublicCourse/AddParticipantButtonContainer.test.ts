import {addNewParticipant} from "./AddParticipantButtonContainer";
import {IOrder, IPublicCourseParticipant} from "@violet/common";

describe("addNewParticipant", () => {
    let updateSelectedOrder: (name: string, value: any) => void;

    beforeEach(() => {
        updateSelectedOrder = jest.fn();
    });

    it("should add new participant to existing participants", () => {
        const selectedOrder = {
            publicCourseParticipants: [
                {id: 0}, {id: 3}, {id: 7}
            ]
        } as unknown as IOrder;

        addNewParticipant(selectedOrder, updateSelectedOrder);

        // @ts-ignore
        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseParticipants", [{id: 0}, {id: 3}, {id: 7}, {}]);
    });

    it("should add new participant when there are no participants", () => {
        const selectedOrder = {} as IOrder;

        addNewParticipant(selectedOrder, updateSelectedOrder);

        // @ts-ignore
        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseParticipants", [{}]);
    });

    it("should add new participant when there are no participants", () => {
        const selectedOrder = {
            publicCourseParticipants: [] as IPublicCourseParticipant[]
        } as IOrder;

        addNewParticipant(selectedOrder, updateSelectedOrder);

        // @ts-ignore
        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseParticipants", [{}]);
    });
});