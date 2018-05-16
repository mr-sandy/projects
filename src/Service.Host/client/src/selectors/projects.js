
export const getProject = (state, id) => {
    const { projects } = state;
    
    return id
        ? projects.find(p => p.id === parseInt(id)) || null
        : null;
}
