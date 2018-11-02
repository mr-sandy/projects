import { combineReducers } from 'redux';
import { reducer as oidc } from 'redux-oidc';
import projects from './projects';
import projectActivities from './projectActivities';
import employees from './employees';
import application from './application';

const reducer = combineReducers({
    oidc,
    projects,
    projectActivities,
    employees,
    application
});

export default reducer;