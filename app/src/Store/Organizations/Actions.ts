import * as actionTypes from "./ActionTypes";
import {IOrganization} from "@violet/common";

export function receiveOrganizations(organizations: { [id: string]: IOrganization }) {
    return {
        type: actionTypes.RECEIVE_ORGANIZATIONS,
        payload: organizations,
    };
}
