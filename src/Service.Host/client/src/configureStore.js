import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import { apiMiddleware as api } from 'redux-api-middleware';
import reducer from './reducers';
//import authorization from './middleware/authorization';

const composeEnhancers =
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const middleware = [
    //authorization,
    //api,
    thunkMiddleware
    //rootProductsMiddleware,
    //routerMiddleware(history),
    //fetchErrorHandlingMiddleware
];


const configureStore = initialState => {
    const enhancers = composeEnhancers(applyMiddleware(...middleware));
    const store = createStore(reducer, initialState, enhancers);

    return store;
};

export default configureStore;