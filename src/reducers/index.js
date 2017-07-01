import {combineReducers} from 'redux';
import LecturesOffered from './reducer-lectures';
import Labels from './reducer-labels';
import Organizations from './reducer-organizations';

const allReducers = combineReducers({
    softwareLabels: Labels,
    lecturesOffered: LecturesOffered,
    organizations: Organizations
});

export default allReducers
