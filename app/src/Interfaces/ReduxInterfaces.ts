import * as SeamlessImmutable from 'seamless-immutable';
import IOrganization from './IOrganization';
import IAppearance from './IAppearance';
import IFirebase from './IFirebase';
import IOrder from './IOrder';
import ILabels from './ILabels';
import ILists from './ILists';
import IPublicCourse from './IPublicCourse';

export type IState = {
    appearance: SeamlessImmutable.Immutable<IAppearance>;
    firebase: SeamlessImmutable.Immutable<IFirebase>;
    labels: ILabels;
    lists: SeamlessImmutable.Immutable<ILists>;
    selectedOrganization: SeamlessImmutable.Immutable<IOrganization>;
    selectedOrder: SeamlessImmutable.Immutable<IOrder>;
    selectedPublicCourses: SeamlessImmutable.Immutable<IPublicCourse>;
    organizations: SeamlessImmutable.Immutable<{ [id: string]: IOrganization }>;
    orders: SeamlessImmutable.Immutable<{ [id: string]: IOrder }>;
    publicCourses: SeamlessImmutable.Immutable<{ [id: string]: IPublicCourse }>;
};
export type IDispatch = Function; // TODO figure this out
export type IGetState = () => IState;