export const getProjectLoading = (state, id) => {
    const { projects } = state;

    return projects.loading;
}

export const getProjectUpdating = (state, id) => {
    const { projects } = state;

    const project = projects.items.find(p => p.id === parseInt(id));

    return project && project.updating;
}

export const getProject = (state, id) => {
    const { projects } = state;

    const project = projects.items.find(p => p.id === parseInt(id));

    return project && !projects.loading
        ? project
        : null;
}
