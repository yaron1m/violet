import * as actionTypes from "./ActionTypes";
import ILists from "../../Interfaces/ILists";

export function receiveLists(lists: ILists) {
    return {
        type: actionTypes.RECEIVE_LISTS,
        payload: lists,
    };
}