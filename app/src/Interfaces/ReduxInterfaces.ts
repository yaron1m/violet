import IOrganization from "./IOrganization";
import IAppearance from "./IAppearance";
import IFirebase from "./IFirebase";
import IOrder from "./IOrder";
import ILabels from "./ILabels";
import ILists from "./ILists";
import IPublicCourse from "./IPublicCourse";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export type IState = {
    appearance: IAppearance;
    firebase: IFirebase;
    labels: ILabels;
    lists: ILists;
    selectedOrganization: {
        isSelectedOrganization: boolean;
        organization: IOrganization,
    };
    selectedOrder: {
        isSelectedOrder: boolean;
        order: IOrder,
    };
    selectedPublicCourse: {
        isSelectedPublicCourse: boolean;
        publicCourse: IPublicCourse;
    };
    organizations: { [id: string]: IOrganization };
    orders: { [id: string]: IOrder };
    publicCourses: { [id: string]: IPublicCourse };
};

export type IDispatch = ThunkDispatch<IState, any, AnyAction>;
export type IGetState = () => IState;