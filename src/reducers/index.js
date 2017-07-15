import {combineReducers} from 'redux';
import OfferedLectures from './reducer-offered-lectures';
import Labels from './reducer-labels';
import DrawerOpen from './reducer-drawer';
import IsFetching from './reducer-is-fetching'
import Organizations from './reducer-organizations'
import Selected from './reducer-selected'
import IsSelected from './reducer-is-selected'
import Orders from './reducer-orders'
import DatabaseStatus from './reducer-database-status'

const allReducers = combineReducers({
    softwareLabels: Labels,
    offeredLectures: OfferedLectures,
    drawerOpen: DrawerOpen,
    isFetching: IsFetching,
    organizations: Organizations,
    selected: Selected,
    isSelected: IsSelected,
    orders: Orders,
    databaseStatus: DatabaseStatus,

});

export default allReducers
