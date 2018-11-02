import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authorisation, navigation, refreshProject, loadEmployees } from './middleware';
import { apiMiddleware as api } from 'redux-api-middleware';
import reducer from './reducers';

const composeEnhancers =
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const middleware = [
    authorisation,
    api,
    navigation,
    refreshProject,
    loadEmployees,
    thunkMiddleware
];


const configureStore = initialState => {
    const enhancers = composeEnhancers(applyMiddleware(...middleware));
    const store = createStore(reducer, initialState, enhancers);

    return store;
};

export default configureStore;