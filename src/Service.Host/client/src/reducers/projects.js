import * as actionTypes from '../actions';

const defaultState = {
    loaded: false,
    loading: false,
    items: []
};

const projects = (prevState = defaultState, action) => {
    switch (action.type) {

        case actionTypes.PROJECTS_REQUESTED:
            return {
                loaded: false,
                loading: true,
                items: []
            };

        case actionTypes.PROJECTS_RECEIVED:
            return {
                loaded: true,
                loading: false,
                items: action.payload
            };

        case actionTypes.CREATE_PROJECT_REQUESTED:
            return {
                ...prevState,
                loading: true
            };

        case actionTypes.CREATE_PROJECT_SUCCEEDED:
            return {
                ...prevState,
                loading: false,
                items: [...prevState.items, action.payload]
            };

        case actionTypes.DELETE_PROJECT_REQUESTED:
        {
            const index = prevState.items.findIndex(p => p.id === action.payload.projectId);

            return {
                ...prevState,
                loading: true,
                items: [
                    ...prevState.items.slice(0, index),
                    ...prevState.items.slice(index + 1)
                ]
            };
        }

        case actionTypes.DELETE_PROJECT_SUCCEEDED:
        {
            return {
                ...prevState,
                loading: false
            };
        }

        case actionTypes.UPDATE_PROJECT_REQUESTED:
            {
                const index = prevState.items.findIndex(p => p.id === action.payload.projectId);

                const { name, startDate } = action.payload.data;

                return {
                    ...prevState,
                    items: [...prevState.items.slice(0, index),
                        {
                            ...prevState.items[index],
                            name,
                            startDate,
                            updating: true
                        },
                        ...prevState.items.slice(index + 1)]
                };
            }

        case actionTypes.ADD_PHASE_REQUESTED:
            {
                const index = prevState.items.findIndex(p => p.id === action.payload.projectId);

                const phases = [
                    ...prevState.items[index].phases,
                    action.payload.data
                ];

                const project = {
                    ...prevState.items[index],
                    phases,
                    updating: true
                };

                return {
                    ...prevState,
                    items: [
                        ...prevState.items.slice(0, index),
                        project,
                        ...prevState.items.slice(index + 1)
                    ]
                };
            }

        case actionTypes.UPDATE_PHASE_REQUESTED:
            {
                const index = prevState.items.findIndex(p => p.id === action.payload.projectId);
                const phaseIndex = prevState.items[index].phases.findIndex(p => p.phaseNumber === action.payload.data.phaseNumber);

                const phases = [
                    ...prevState.items[index].phases.slice(0, phaseIndex),
                    action.payload.data,
                    ...prevState.items[index].phases.slice(phaseIndex + 1)
                ];

                const project = {
                    ...prevState.items[index],
                    phases,
                    updating: true
                };

                return {
                    ...prevState,
                    items: [
                        ...prevState.items.slice(0, index),
                        project,
                        ...prevState.items.slice(index + 1)
                    ]
                };
            }

        case actionTypes.REMOVE_PHASE_REQUESTED:
            {
                const index = prevState.items.findIndex(p => p.id === action.payload.projectId);
                const phaseIndex = prevState.items[index].phases.findIndex(p => p.phaseNumber === action.payload.data.phaseNumber);

                const phases = [
                    ...prevState.items[index].phases.slice(0, phaseIndex),
                    ...prevState.items[index].phases.slice(phaseIndex + 1)
                ];

                const project = {
                    ...prevState.items[index],
                    phases,
                    updating: true
                };

                return {
                    ...prevState,
                    items: [
                        ...prevState.items.slice(0, index),
                        project,
                        ...prevState.items.slice(index + 1)
                    ]
                };
            }

        case actionTypes.UPDATE_PROJECT_SUCCEEDED:
        case actionTypes.ADD_PHASE_SUCCEEDED:
        case actionTypes.UPDATE_PHASE_SUCCEEDED:
        case actionTypes.REMOVE_PHASE_SUCCEEDED:
            {
                const index = prevState.items.findIndex(p => p.id === action.payload.projectId);

                const project = {
                    ...prevState.items[index],
                    updating: false
                };

                return {
                    ...prevState,
                    items: [
                        ...prevState.items.slice(0, index),
                        project,
                        ...prevState.items.slice(index + 1)
                    ]
                };
            }

        default:
            return prevState;
    }
}
export default projects;