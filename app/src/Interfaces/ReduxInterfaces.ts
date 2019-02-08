import * as SeamlessImmutable from 'seamless-immutable';
import IOrganization from './IOrganization';

export type IState = {
    selectedOrganization: SeamlessImmutable.Immutable<IOrganization>;
    selectedOrder: SeamlessImmutable.Immutable<IItemsMap>;
    organizations: SeamlessImmutable.Immutable<IItem>;
    orders: SeamlessImmutable.Immutable<IUser>;
};
export type IDispatch = Function; // TODO figure this out
export type IGetState = () => IState;