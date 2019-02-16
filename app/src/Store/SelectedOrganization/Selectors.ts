import {toMutable} from '../../Util/ObjectUpdater';
import {IState} from '../../Interfaces/ReduxInterfaces';

export function getSelectedOrganization(state: IState) {
    return toMutable(state.selectedOrganization).organization;
}

export function isSelectedOrganization(state: IState) {
    return state.selectedOrganization.isSelectedOrganization;
}