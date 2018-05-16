import { statuses } from '../constants';

export const statusColours =
    {
        [statuses.PLANNED]: '#ffd301',
        [statuses.IN_PROGRESS]: '#0be50b',
        [statuses.COMPLETE]: '#08c208',
        [statuses.AT_RISK]: '#ff8c00',
        [statuses.LATE]: 'red'
    };

export const statusColour = status => {
    switch (status) {
        case statuses.PLANNED:
            return '#FFD301';

        case statuses.IN_PROGRESS:
            return '#08c208';

        case statuses.COMPLETE:
            return 'green';

        case statuses.AT_RISK:
            return '#ff8c00';

        case statuses.LATE:
            return 'red';

        default:
            return 'white';
    }
};