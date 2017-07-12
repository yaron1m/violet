import {combineReducers} from 'redux';
import OfferedLectures from './reducer-offered-lectures';
import Labels from './reducer-labels';
import Organizations from './reducer-organizations';
import LectureTimes from './reducer-lecture-times';
import DrawerOpen from './reducer-drawer';

const allReducers = combineReducers({
    softwareLabels: Labels,
    offeredLectures: OfferedLectures,
    organizations: Organizations,
    lectureTimes: LectureTimes,
    drawerOpen: DrawerOpen
});

export default allReducers
