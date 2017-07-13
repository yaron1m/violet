import {combineReducers} from 'redux';
import OfferedLectures from './reducer-offered-lectures';
import Labels from './reducer-labels';
import LectureTimes from './reducer-lecture-times';
import DrawerOpen from './reducer-drawer';
import IsFetching from './reducer-is-fetching'
import Organizations from './reducer-organizations'
import Selected from './reducer-selected'
import Orders from './reducer-orders'

const allReducers = combineReducers({
    softwareLabels: Labels,
    offeredLectures: OfferedLectures,
    lectureTimes: LectureTimes,
    drawerOpen: DrawerOpen,
    isFetching: IsFetching,
    organizations: Organizations,
    selected: Selected,
    orders: Orders

});

export default allReducers
