import * as actionTypes from '../../actions';
import moment from 'moment';

const defaultState = {
    monthsToShow: 6,
    startDate: new Date()
}

const dashboard = (prevState = defaultState, action) => {
    switch (action.type) {
        case actionTypes.VIEW_EARLIER_DASHBOARD:
            return {
                ...prevState,
                startDate: moment(prevState.startDate).subtract(1, 'months').toDate()
            }
        case actionTypes.VIEW_LATER_DASHBOARD:
            return {
                ...prevState,
                startDate: moment(prevState.startDate).add(1, 'months').toDate()
            }
        case actionTypes.ZOOM_IN:
            return {
                ...prevState,
                monthsToShow: prevState.monthsToShow > 1 ? prevState.monthsToShow - 1 : 1
            }
        case actionTypes.ZOOM_OUT:
            return {
                ...prevState,
                monthsToShow: prevState.monthsToShow < 24 ? prevState.monthsToShow + 1 : 24
            }
        default:
            return prevState;
    }
}

export default dashboard;