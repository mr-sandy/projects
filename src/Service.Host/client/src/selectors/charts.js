import { getProject } from './projects';
import { getMonths, getRelativeStart, getRelativeEnd } from './utilities/date';
import { getProjectDateRange, projectFilter, projectComparison } from './utilities/projects';

const getProjectData = (project, dateRange, months) => ({
    ...project,
    phases: project.phases.map(
        phase => {
            const overallStart = getRelativeStart(phase.startDate, dateRange);
            const overallEnd = getRelativeEnd(phase.endDate, dateRange);

            return {
                phase: phase.phase,
                status: phase.status,
                startDate: phase.startDate,
                endDate: phase.endDate,
                timeline: {
                    overall: {
                        start: overallStart === overallEnd ? null : overallStart,
                        end: overallStart === overallEnd ? null : overallEnd
                    },
                    monthly: months.map(month => {
                        const monthStart = getRelativeStart(phase.startDate, month);
                        const monthEnd = getRelativeEnd(phase.endDate, month);

                        return {
                            month: month.month,
                            year: month.year,
                            start: monthStart === monthEnd ? null : monthStart,
                            end: monthStart === monthEnd ? null : monthEnd
                        };
                    })
                }
            }
        })
});

export const getProjectChart = (state, projectId) => {
    const project = getProject(state, projectId);

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
            .filter(projectFilter(dateRange))
            .sort(projectComparison)
            .map(project => getProjectData(project, dateRange, months))
    };
}