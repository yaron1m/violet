import {IState} from "../../Interfaces/ReduxInterfaces";
import {toMutable} from "../../Util/ObjectUpdater";
import _ from "lodash";

function getLists(state: IState) {
    return toMutable(state.lists);
}

export function getOfferedLectures(state: IState) {
    const offeredLectures = getLists(state).offeredLectures;
    return _.keys(offeredLectures).filter((lecture) => offeredLectures[lecture]);
}

export function getRejectionReasons(state: IState) {
    return _.values(getLists(state).rejectionReasons);
}

export function getCancellationReasons(state: IState) {
    return _.values(getLists(state).cancellationReasons);
}

export function getReferralWays(state: IState) {
    return _.values(getLists(state).referralWays);
}