import { useState, useEffect } from 'react'
import userService from '../services/users'
import workoutService from '../services/workouts'


//nyt toimii mappaus ja että näyttää userin workoutit vain
const Workouts = ({user, setUser}) => {
  const [userId, setUserId] = useState(null)
  const [userWorkouts, setUserWorkouts] = useState([])
 
  useEffect(() => {
    const fetchUserId = async () => {
      if (user) {
        const id = await userService.GetUserId(user.username)
        setUserId(id)
      }
    }

    fetchUserId()
  }, [user])

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      if (userId) {
        const workouts = await workoutService.getAllByUser(userId)
        console.log(workouts)
        setUserWorkouts(workouts)
      }
    }
    fetchUserWorkouts()
  }, [user, userId])

  if (!user) {
    return (
      <>
        <h2 className="text-center mb-4">You must be logged in to see your workouts</h2>
      </>
    )
  }

  const testi = async () => {
    const testii = workoutService.getAllByUser(userId)
    console.log("testi:", testii)
    console.log(userId)
    console.log(userWorkouts)
  }

  const deleteWorkout = (id) => {
    const newWorkouts = [...userWorkouts]
    newWorkouts.splice(id, 1)
    setUserWorkouts(newWorkouts)
  }

  return (
    <div>
       <h2 className="text-center mb-4">Workouts by {user.username}</h2>
       <button onClick={testi}>testi</button>
       <WorkoutList userWorkouts={userWorkouts} deleteWorkout={deleteWorkout}/>
    </div>
  )
}

const WorkoutList = ({ userWorkouts, deleteWorkout }) => {
  const [showWholeWorkout, setShowWholeWorkout] = useState(false)
  const [workoutIndex, setWorkoutIndex] = useState(-1)

  const handleWorkoutClick = (index) => {
    setShowWholeWorkout(!showWholeWorkout)
    setWorkoutIndex(index)

  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="list-group">
          {userWorkouts.map((workout, index) => (
              <div onClick={() => handleWorkoutClick(index)} key={workout.id} className="list-group-item cursorpointer">
                {showWholeWorkout && index === workoutIndex ? (
                  <div>
                    <Workout workout={workout} deleteWorkout={deleteWorkout} 
                      index={index} setShowWholeWorkout={setShowWholeWorkout}
                    />
                    <WorkoutExercises workout={workout} />
                  </div>
                ) : (
                  <Workout workout={workout} deleteWorkout={deleteWorkout} index={index}/>
                )}        
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Workout = ( {workout, deleteWorkout, index, setShowWholeWorkout }) => {

  const handleDeleteExercise = async (id) => {
    console.log(id)
    try {
      const confirmed = window.confirm('Are you sure, that you want to delete workout?')
      if (confirmed) {
        await workoutService.deleteWorkout(id)
        deleteWorkout(index)
        console.log('Workout deleted')
      }
    } catch (error) {
      console.error('Error deleting workout:', error)
    }
  }

  return (
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{workout.name}</h5>
      <small>{workout.date}</small>
      <button onClick={() => handleDeleteExercise(workout.id)} type="button" className="btn btn-danger btn-sm">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

const WorkoutExercises = ({ workout }) => {

  return (
    <div>
      {workout.exercises.map((exercise, index) => (
        <p key={index}>{exercise.name} {exercise.weight} kg {exercise.reps} x</p>
      ))}
    </div>
  )
}

export default Workouts