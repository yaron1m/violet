import {combineReducers} from 'redux';
import OfferedLectures from './offered-lectures/reducer';
import labels from './labels/reducer';
import DrawerOpen from '../reducers/reducer-drawer';
import IsFetching from '../reducers/reducer-is-fetching'
import Organizations from '../reducers/reducer-organizations'
import Selected from '../reducers/reducer-selected'
import IsSelected from '../reducers/reducer-is-selected'
import Orders from '../reducers/reducer-orders'
import DatabaseStatus from '../reducers/reducer-database-status'

const combinedReducers = combineReducers({
    OfferedLectures,
    labels,
    drawerOpen: DrawerOpen,
    isFetching: IsFetching,
    organizations: Organizations,
    selected: Selected,
    isSelected: IsSelected,
    orders: Orders,
    databaseStatus: DatabaseStatus,

});

export default combinedReducers
