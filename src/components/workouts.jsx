import { useState, useEffect } from 'react'
import userService from '../services/users'
import workoutService from '../services/workouts'


//nyt toimii mappaus ja että näyttää userin workoutit vain
const Workouts = ({user, setUser}) => {
  const [addWorkout, setAddWorkout] = useState(false)
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
        setUserWorkouts(workouts)
      }
    }
    fetchUserWorkouts()
  }, [user, userId])

  if (!user) {
    return (
      <>
        <h2>You must be logged in to see your workouts</h2>
      </>
    )
  }

  const testi = async () => {
    const testii = workoutService.getAllByUser(userId)
    console.log("testi:", testii)
    console.log(userId)
    console.log(userWorkouts)
  }

  return (
    <div>
       <h2>tähän tulee myöhemmin lista treeneistä</h2>
       <button onClick={testi}>testi</button>
       {userWorkouts.map((workout, index) => (
        <div key={workout.id}>
          <p>{workout.name} {workout.date}</p>
        </div>
       ))}
    </div>
  )
}

export default Workouts