export const getProjectsLoading = state => {
    const { projects } = state;

    return projects.loading;
}

export const getProjectsLoaded = state => {
    const { projects } = state;

    return projects.loaded;
}

