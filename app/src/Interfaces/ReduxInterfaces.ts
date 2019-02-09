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
    selectedOrganization: SeamlessImmutable.Immutable<{
        isSelectedOrganization: boolean;
        organization: IOrganization,
    }>;
    selectedOrder: SeamlessImmutable.Immutable<{
        isSelectedOrder: boolean;
        order: IOrder,
    }>;
    selectedPublicCourse: SeamlessImmutable.Immutable<{
        isSelectedPublicCourse: boolean;
        publicCourse: IPublicCourse;
    }>;
    organizations: SeamlessImmutable.Immutable<{ [id: string]: IOrganization }>;
    orders: SeamlessImmutable.Immutable<{ [id: string]: IOrder }>;
    publicCourses: SeamlessImmutable.Immutable<{ [id: string]: IPublicCourse }>;
};
export type IDispatch = Function; // TODO figure this out
export type IGetState = () => IState;