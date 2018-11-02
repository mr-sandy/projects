import { getProject } from './project';
import { getMonths, getRelativeStart, getRelativeEnd, getNextDay } from './utilities/date';
import { getProjectDateRange, projectFilter, projectComparison } from './utilities/projects';

const getProjectData = (project, dateRange, months) => ({
    ...project,
    phases: project.phases.reduce((sofar, phase) => {
        const overallStart = getRelativeStart(sofar.startDate, dateRange);
        const overallEnd = getRelativeEnd(phase.endDate, dateRange);

        const data = {
            phaseNumber: phase.phaseNumber,
            status: phase.status,
            startDate: sofar.startDate,
            endDate: phase.endDate,
            timeline: {
                overall: {
                    start: overallStart === overallEnd ? null : overallStart,
                    end: overallStart === overallEnd ? null : overallEnd
                },
                monthly: months.map(month => {
                    const monthStart = getRelativeStart(sofar.startDate, month);
                    const monthEnd = getRelativeEnd(phase.endDate, month);

                    return {
                        month: month.month,
                        year: month.year,
                        start: monthStart === monthEnd ? null : monthStart,
                        end: monthStart === monthEnd ? null : monthEnd
                    };
                })
            }
        };

        return {
            result: [...sofar.result, data],
            startDate: getNextDay(phase.endDate)
        }
    }, { result: [], startDate: project.startDate }).result
});

export const getProjectChart = (state, projectId) => {
    const project = getProject(state, projectId);

    if (project === null) {
        return null;
    }

    const dateRange = getProjectDateRange(project);
    const { startDate, noOfMonths } = dateRange;

    const months = getMonths(startDate, noOfMonths);

    return {
        months: months.map(month => ({
            month: month.month,
            year: month.year,
            daysInMonth: month.daysInMonth
        })),
        project: getProjectData(project, dateRange, months)
    };
};

export const getSummaryChart = state => {
    const { application, projects } = state;
    const { startDate, monthsToShow } = application.dashboard;

    const months = getMonths(startDate, monthsToShow);

    const dateRange = {
        startDate: months[0].startDate,
        endDate: months[months.length - 1].endDate
    };

    return {
        months: months.map(month => ({
            month: month.month,
            year: month.year,
            daysInMonth: month.daysInMonth
        })),
        projects: projects
            .items
            .filter(projectFilter(dateRange))
            .sort(projectComparison)
            .map(project => getProjectData(project, dateRange, months))
    };
}