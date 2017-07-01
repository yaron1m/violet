import {combineReducers} from 'redux';
import Lectures from './reducer-lectures';
import Labels from './reducer-labels';
import Organizations from './reducer-organizations';

const allReducers = combineReducers({
    softwareLabels: Labels,
    lecturesOffered: Lectures,
    organizations: Organizations
});

export default allReducers
