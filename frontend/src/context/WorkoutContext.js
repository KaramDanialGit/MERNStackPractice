import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const WorkoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                // Adds the new workout from aciton payload to prev state workouts
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        default:
            return state
    }
}

// children represents whatever the context provider wraps (<App> Here)
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(WorkoutsReducer, {
        workouts: null
    })

    // dispatch({ type: 'SET_WORKOUTS', payload: [{}, {}] })

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}