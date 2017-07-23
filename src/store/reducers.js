import {combineReducers} from 'redux';
import offeredLectures from './offered-lectures/reducer';
import labels from './labels/reducer';
import DrawerOpen from '../reducers/reducer-drawer';
import organizations from './organizations/reducer'
import Selected from '../reducers/reducer-selected'
import IsSelected from '../reducers/reducer-is-selected'
import Orders from '../reducers/reducer-orders'
import DatabaseStatus from '../reducers/reducer-database-status'

const combinedReducers = combineReducers({
    offeredLectures,
    labels,
    drawerOpen: DrawerOpen,
    organizations,
    selected: Selected,
    isSelected: IsSelected,
    orders: Orders,
    databaseStatus: DatabaseStatus,

});

export default combinedReducers
