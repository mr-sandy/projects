import moment from 'moment';
import { statuses } from '../../../constants';

export const sortPhases = (a, b) => {
    if (a.phaseNumber < b.phaseNumber)
        return -1;
    else if (a.phaseNumber > b.phaseNumber)
        return 1;
    else
        return 0;
};

export const getLastPhase = project => {
    return project.phases && project.phases.length > 0
        ? project.phases.reduce((greatest, phase) => greatest && greatest.phaseNumber > phase.phaseNumber ? greatest : phase)
        : null;
}

export const initNewPhase = project => {
    const lastDate = project.phases.length > 0 ? getLastPhase(project).endDate : project.startDate;
    return {
        status: statuses.PLANNED,
        endDate: moment(lastDate).add(1, 'M').toDate()
    };
}
