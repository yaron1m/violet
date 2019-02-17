import * as actions from "./Actions";
import * as actionTypes from "./ActionTypes";
import ILists from "../../Interfaces/ILists";

describe("Lists reducer actions", () => {
    it("should create an action of received lists", () => {
        const lists = {blah: "hello"} as unknown as ILists;
        const expectedAction = {
            type: actionTypes.RECEIVE_LISTS,
            payload: lists,
        };
        expect(actions.receiveLists(lists)).toEqual(expectedAction);
    });
});
