import _ from "lodash";

export function getOrganizations(state) {
    return state.organizations;
}

export function getNextOrganizationId(state) {
    const organizations = getOrganizations(state);
    const keys = _.keys(organizations);
    if (!organizations || keys.length === 0)
        return null;
    return _.max(_.map(_.keys(organizations), _.parseInt)) + 1;
}

export function getOrganizationById(state, id) {
    return getOrganizations(state)[id];
}