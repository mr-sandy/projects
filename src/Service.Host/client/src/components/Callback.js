import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../helpers/userManager';
import { Loading } from './common/Loading';

class Callback extends React.Component {
    render() {
        const { history } = this.props

        // TODO: handle error case appropriately
        return (
            <CallbackComponent
                userManager={userManager}
                successCallback={user => history.push(user.state.redirect)}
                errorCallback={err => console.error(err)} >
                <Loading />
            </CallbackComponent>
        );
    }
}

export default Callback;
