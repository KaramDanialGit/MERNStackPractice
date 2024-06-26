import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()

    // Fires a function when the component is rendered. We only need it once so pass an
    // empty dependancy array []

    useEffect(() => {
        const fetchWorkouts = async () => {
            // *****
            // URL was originally this 'http://localhost:4000/api/workouts' but we added the 
            // backend as a proxy on the firstline of the package.json frontend to reroute unrecognized reqs.
            // Since react will not see /api/workouts internally as a static asset, it will proxy it to the port
            // in the package.json file specified under "proxy"
            // *****

            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }

        fetchWorkouts()
    }, [dispatch])

    return (
        <div className="Home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home