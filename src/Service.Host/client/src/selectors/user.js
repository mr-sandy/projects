
export const getAccessToken = state => {
    if (!state.oidc.user) {
        return null;
    }

    return state.oidc.user.access_token;
};
