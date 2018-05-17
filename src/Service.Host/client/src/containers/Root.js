import React from 'react';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Project from './Project';
import NewProject from './NewProject';
import Navigation from '../components/Navigation';
import Callback from '../containers/Callback';
import userManager from '../helpers/userManager';
import history from '../helpers/history';

class Root extends React.Component {
    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <OidcProvider store={store} userManager={userManager}>
                    <Router history={history}>
                        <div>
                            <Navigation />

                            <Route path="/" render={() => { document.title = 'Projects'; return false; }} />
                            <Route exact path="/" render={() => <Redirect to="/projects" />} />
                            <Switch>
                                <Route exact path="/projects" component={Dashboard} />
                                <Route exact path="/projects/signin-oidc-client" component={Callback} />
                                <Route exact path="/projects/new" component={NewProject} />
                                <Route exact path="/projects/:projectId" component={Project} />
                            </Switch>
                        </div>
                    </Router>
                </OidcProvider>
            </Provider>
        );
    }
}

export default Root;