import * as SeamlessImmutable from 'seamless-immutable';
import IOrganization from './IOrganization';
import IAppearance from './IAppearance';
import IFirebase from './IFirebase';
import IOrder from './IOrder';

export type IState = {
    appearance: SeamlessImmutable.Immutable<IAppearance>;
    firebase: SeamlessImmutable.Immutable<IFirebase>;
    selectedOrganization: SeamlessImmutable.Immutable<IOrganization>;
    selectedOrder: SeamlessImmutable.Immutable<IOrder>;
    organizations: SeamlessImmutable.Immutable<{ [id: string]: IOrganization }>;
    orders: SeamlessImmutable.Immutable<{ [id: string]: IOrder }>;
};
export type IDispatch = Function; // TODO figure this out
export type IGetState = () => IState;