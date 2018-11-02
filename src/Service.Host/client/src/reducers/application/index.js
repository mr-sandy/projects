import { combineReducers } from 'redux';
import dashboard from './dashboard';
import error from './error';

const application = combineReducers({
    error,
    dashboard
});

export default application;