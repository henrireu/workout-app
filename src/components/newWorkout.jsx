import { useState } from 'react'
import userService from '../services/users'
import workoutService from '../services/workouts'

const NewWorkouts = ({user, setPage}) => {

  if (!user) {
    return (
      <>
        <h2>You must be logged in to create new workouts</h2>
      </>
    )
  }

  return (
    <div>
      <CreateWorkout user={user} setPage={setPage}/>
    </div>
  )
}

const CreateWorkout = ({ user, setPage }) => {
  const [date, setDate] = useState('')
  const [workoutName, setWorkoutName] = useState('')
  const [addMove, setAddMove] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    setAddMove(true)
  }

  if (addMove) {
    return <CreateMoves workoutName={workoutName} date={date} user={user} setPage={setPage}/>
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Create Workout</h2>
          <form onSubmit={handleSubmit}>
            {/* Päivämäärä */}
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            {/* Treenin nimi */}
            <div className="mb-3">
              <label htmlFor="workoutName" className="form-label">Workout Name</label>
              <input
                type="text"
                className="form-control"
                id="workoutName"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                required
              />
            </div>
            {/* Submit-nappi */}
            <button type="submit" className="btn btn-primary btn-block">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

const CreateMoves = ( { workoutName, date, user, setPage }) => {
  const [exerciseName, setExerciseName] = useState('')
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [exercises, setExercises] = useState([])

  const handleAddExercise = () => {
    if (name && reps) {
      const newExercise = { name, weight: weight || 0, reps }
      //const newExercise = { exerciseName, weight: weight || 0, reps }
      setExercises([...exercises, newExercise])
      // Nollaa kentät lisäyksen jälkeen
      setWeight('')
      setReps('')
    } else {
      alert('Please fill in all fields.')
    }
  }


  const handleSaveWorkout = async () => {
    try {
      const userId = await userService.GetUserId(user.username)
      const wholeWorkout = {
        name: workoutName,
        date: date,
        userId: userId,
        exercises: exercises
      }
  
      workoutService.create(wholeWorkout)
      
      console.log('Saved workout:', exercises)
      setExercises([])
      setName('')
      setTimeout(() => {
        setPage('workouts')
      }, 1000)
    } catch (error) {
      console.error('Error creating workout', error)
    }
  }

  const handleDeleteExercise = (index) => {
    let newExercises = [...exercises]
    newExercises.splice(index, 1)
    setExercises(newExercises)
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Workout Form</h2>
      <div className="mb-3 d-flex align-items-center">
        <label htmlFor="exerciseName" className="form-label">Exercise Name</label>
        <input
          type="text"
          className="form-control me-2"
          id="name"
          value={name}
          //onChange={(e) => setExerciseName(e.target.value)}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="weight" className="form-label">Weight (kg)</label>
        <input
          type="number"
          className="form-control me-2"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <label htmlFor="reps" className="form-label mr-3">Reps</label>
        <input
          type="number"
          className="form-control me-2"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={handleAddExercise}>Add Exercise</button>
        <button type="button" className="btn btn-success ms-2" onClick={handleSaveWorkout}>Save Workout</button>
      </div>
      {/*workout details */}
      <div className="row">
        <h2>{workoutName} &nbsp; {date}</h2>
        <div className="col">
          <ul className="list-group list-group-flush">
            {exercises.slice(0, 10).map((exercise, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                <span>{index + 1}. {exercise.exerciseName} - {exercise.weight} kg x {exercise.reps}</span>
                <button onClick={() => handleDeleteExercise(index)} type="button" className="btn btn-danger btn-sm">
                  <span aria-hidden="true">&times;</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <ul className="list-group list-group-flush">
            {exercises.slice(10, 20).map((exercise, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index + 10}>
                <span>{index + 11}. {exercise.exerciseName} - {exercise.weight} kg x {exercise.reps}</span>
                <button onClick={() => handleDeleteExercise(index + 10)} type="button" className="btn btn-danger btn-sm">
                  <span aria-hidden="true">&times;</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <ul className="list-group list-group-flush">
            {exercises.slice(20, 30).map((exercise, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index + 20}>
                <span>{index + 21}. {exercise.exerciseName} - {exercise.weight} kg x {exercise.reps}</span>
                <button onClick={() => handleDeleteExercise(index + 20)} type="button" className="btn btn-danger btn-sm">
                  <span aria-hidden="true">&times;</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NewWorkouts