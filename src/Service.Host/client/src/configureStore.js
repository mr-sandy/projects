import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authorisation, fetchError, navigation } from './middleware';
import { apiMiddleware as api } from 'redux-api-middleware';
import reducer from './reducers';

const composeEnhancers =
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const middleware = [
    thunkMiddleware,
    authorisation,
    api,
    navigation,
    fetchError
];


const configureStore = initialState => {
    const enhancers = composeEnhancers(applyMiddleware(...middleware));
    const store = createStore(reducer, initialState, enhancers);

    return store;
};

export default configureStore;