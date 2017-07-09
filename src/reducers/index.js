import {combineReducers} from 'redux';
import LecturesOffered from './reducer-lectures';
import Labels from './reducer-labels';
import Organizations from './reducer-organizations';
import LectureTimes from './reducer-lecture-times';

const allReducers = combineReducers({
    softwareLabels: Labels,
    lecturesOffered: LecturesOffered,
    organizations: Organizations,
    lectureTimes: LectureTimes
});

export default allReducers
