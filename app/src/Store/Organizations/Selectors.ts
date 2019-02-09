import _ from "lodash";
import {IState} from '../../Interfaces/ReduxInterfaces';
import {toMutable} from '../../util/ObjectUpdater';

export function getOrganizations(state: IState) {
    return toMutable(state.organizations);
}

export function getOrganizationById(state: IState, id: string) {
    return getOrganizations(state)[id];
}

export function getNextOrganizationId(state: IState) {
    const organizations = getOrganizations(state);
    const keys = _.keys(organizations);
    if (!organizations || keys.length === 0)
        return 1000;

    // @ts-ignore
    return _.max(_.map(_.keys(organizations), _.parseInt)) + 1;
}
