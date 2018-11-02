import { getEmployee} from './employees';

export const getProjectActivitiesLoading = (state, id) => {
    const { projectActivities } = state;

    const activities = projectActivities.find(p => p.projectId === parseInt(id));

    return activities && activities.loading;
}

export const getProjectActivitiesUpdating = (state, id) => {
    const { projectActivities } = state;

    const activities = projectActivities.find(p => p.projectId === parseInt(id));

    return activities && activities.updating;
}

export const getProjectActivities = (state, id) => {
    const { projectActivities } = state;

    const activities = projectActivities.find(p => p.projectId === parseInt(id));

    return activities && !activities.loading
        ? activities.items.map((a, i) => ({ ...a, index: i, employee: getEmployee(state, a.employeeUrl) }))
        : null;
}
