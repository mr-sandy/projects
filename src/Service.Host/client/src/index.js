import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './configureStore';
import Root from './containers/Root';
import userManager from './helpers/userManager';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/kaboom/kaboom.css'
import './css/index.scss';

const initialState = {
    projects: [
        {
            id: 2,
            name: 'Pricing',
            phases: [
                {
                    phase: 0,
                    status: 'COMPLETE',
                    startDate: '2017-12-01',
                    endDate: '2018-01-26'
                },
                {
                    phase: 1,
                    status: 'IN_PROGRESS',
                    startDate: '2018-01-27',
                    endDate: '2018-02-14'
                },
                {
                    phase: 2,
                    status: 'LATE',
                    startDate: '2018-02-15',
                    endDate: '2018-03-31'
                },
                {
                    phase: 3,
                    status: 'AT_RISK',
                    startDate: '2018-04-01',
                    endDate: '2018-07-14'
                },
                {
                    phase: 4,
                    status: 'PLANNED',
                    startDate: '2018-07-15',
                    endDate: '2018-07-20'
                }
            ]
        },
        {
            id: 1,
            name: 'Discounting',
            phases: [
                {
                    phase: 0,
                    status: 'COMPLETE',
                    startDate: '2017-10-14',
                    endDate: '2017-11-14'
                },
                {
                    phase: 1,
                    status: 'COMPLETE',
                    startDate: '2017-11-15',
                    endDate: '2017-12-16'
                },
                {
                    phase: 2,
                    status: 'IN_PROGRESS',
                    startDate: '2017-12-17',
                    endDate: '2018-01-31'
                },
                {
                    phase: 3,
                    status: 'PLANNED',
                    startDate: '2018-02-01',
                    endDate: '2018-02-14'
                }
            ]
        }
    ]
};

const store = configureStore(initialState || undefined);
const user = store.getState().oidc.user;

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store} />
        </AppContainer>,
        document.getElementById('root')
    );
}

if ((!user || user.expired) && window.location.pathname !== '/projects/signin-oidc-client') {
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