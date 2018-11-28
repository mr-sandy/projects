
export const getAccessToken = state => {
    if (!state.oidc.user) {
        return null;
    }

    return state.oidc.user.access_token;
};

export const getUserCanEdit = state => {
    if (!state.oidc.user || !state.oidc.user.profile) {
        return false;
    }

    const editors = ['sandyco', 'alisont', 'emmas'];
    const username = state.oidc.user.profile.preferred_username;

    return editors.includes(username);
}