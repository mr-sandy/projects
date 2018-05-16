import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './configureStore';
import Root from './containers/Root';
import userManager from './helpers/userManager';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/kaboom/kaboom.css'
import './css/index.scss';

const store = configureStore(window.initialState || undefined);
const user = store.getState().oidc.user;

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store} />
        </AppContainer>,
        document.getElementById('root')
    );
}

if (
    (!user || user.expired) &&
    window.location.pathname !== '/projects/signin-oidc-client') {
    userManager.signinRedirect({ data: { redirect: window.location.pathname } });
} else {
    render(Root);

    // Hot Module Replacement API
    if (module.hot) {
        //module.hot.accept('./reducers', () => store.replaceReducer(reducer));
        //module.hot.accept('./reducers', () => store.replaceReducer(reducer));
        module.hot.accept('./containers/Root',
            () => {
                const NextRoot = require('./containers/Root').default;
                render(NextRoot);
            });
    }
}