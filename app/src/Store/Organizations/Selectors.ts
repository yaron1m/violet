import _ from "lodash";
import {IState} from "../../Interfaces/ReduxInterfaces";
import {toMutable} from "../../Util/ObjectUpdater";

function getOrganizationsMap(state: IState) {
    return toMutable(state.organizations);
}

export function getOrganizations(state: IState) {
    return _.values(getOrganizationsMap(state));
}

export function getOrganizationById(state: IState, id: string) {
    return getOrganizationsMap(state)[id];
}

export function getNextOrganizationId(state: IState) {
    const organizations = getOrganizationsMap(state);
    const keys = _.keys(organizations);
    if (!organizations || keys.length === 0)
        return 1000;

    const maxId = _.max(_.map(_.keys(organizations), _.parseInt));
    if (!maxId)
        return 1000;

    return maxId + 1;
}
