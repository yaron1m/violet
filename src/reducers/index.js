import {combineReducers} from 'redux';
import Lectures from './reducer-lectures';
import Labels from './reducer-labels';

const allReducers = combineReducers({
    softwareLabels: Labels,
    lectures: Lectures,
});

export default allReducers
