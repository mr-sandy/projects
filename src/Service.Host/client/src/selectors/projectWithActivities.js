import { getProject, getProjectLoading, getProjectUpdating } from './project';
import { getProjectActivities, getProjectActivitiesLoading, getProjectActivitiesUpdating } from './projectActivities';

export const getProjectWithActivities = (state, id) => {
    var project = getProject(state, id);
    var activities = getProjectActivities(state, id);

    return project && activities
        ? {
            ...project,
            activities
        }
        : null;
}

export const getProjectWithActivitiesLoading = (state, id) => {
    var projectLoading = getProjectLoading(state, id);
    var activitiesLoading = getProjectActivitiesLoading(state, id);

    return projectLoading || activitiesLoading;
}

export const getProjectWithActivitiesUpdating = (state, id) => {
    var projectUpdating = getProjectUpdating(state, id);
    var activitiesUpdating = getProjectActivitiesUpdating(state, id);

    return projectUpdating || activitiesUpdating;
}