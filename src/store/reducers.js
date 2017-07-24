import {combineReducers} from 'redux';
import drawer from './drawer/reducer';
import firebase from './firebase/reducer';
import labels from './labels/reducer';
import offeredLectures from './offered-lectures/reducer';
import orders from './orders/reducer'
import organizations from './organizations/reducer'
import selected from './selected/reducer'

const combinedReducers = combineReducers({
    drawer,
    firebase,
    labels,
    offeredLectures,
    orders,
    organizations,
    selected,
});

export default combinedReducers
