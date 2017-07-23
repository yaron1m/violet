import {combineReducers} from 'redux';
import offeredLectures from './offered-lectures/reducer';
import labels from './labels/reducer';
import drawer from './drawer/reducer';
import organizations from './organizations/reducer'
import selected from './selected/reducer'
import orders from './orders/reducer'
import DatabaseStatus from '../reducers/reducer-database-status'

const combinedReducers = combineReducers({
    offeredLectures,
    labels,
    drawer,
    organizations,
    selected,
    orders,
    databaseStatus: DatabaseStatus,

});

export default combinedReducers
