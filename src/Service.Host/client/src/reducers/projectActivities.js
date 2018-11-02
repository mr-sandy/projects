import * as actionTypes from '../actions';

const projectActivities = (prevState = [], action) => {
    switch (action.type) {

        case actionTypes.PROJECT_ACTIVITIES_REQUESTED:
            {
                const index = prevState.findIndex(p => p.projectId === action.payload.projectId);

                return index > -1
                    ? [
                        ...prevState.slice(0, index),
                        {
                            projectId: action.payload.projectId,
                            loading: false,
                            updating: true,
                            items: prevState[index].items
                        },
                        ...prevState.slice(index + 1)
                    ]
                    : [
                        ...prevState,
                        {
                            projectId: action.payload.projectId,
                            loading: true,
                            updating: false,
                            items: []
                        }
                    ]
            }

        case actionTypes.PROJECT_ACTIVITIES_RECEIVED:
            {
                const index = prevState.findIndex(p => p.projectId === action.payload.projectId);

                return [
                    ...prevState.slice(0, index),
                    {
                        projectId: action.payload.projectId,
                        loading: false,
                        updating: false,
                        items: action.payload.data
                    },
                    ...prevState.slice(index + 1)
                ];
            }

        default:
            return prevState;
    }
}

export default projectActivities;