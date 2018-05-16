import { combineReducers } from 'redux';
import { reducer as oidc } from 'redux-oidc';
import projects from './projects';
import application from './application';

const reducer = combineReducers({
    oidc,
    projects,
    application
});

export default reducer;