import { useState } from 'react'
import userService from '../services/users'
import workoutService from '../services/workouts'

const NewWorkouts = ({user, setPage}) => {

  if (!user) {
    return (
      <>
        <h2 className="text-center mb-4">You must be logged in to create new workouts</h2>
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
  const [exercises, setExercises] = useState([])


  const deleteWholeWorkout = () => {
    const confirmed = window.confirm('Are you sure you want to delete whole workout?')
    if (confirmed) {
      setDate('')
      setWorkoutName('')
      setExercises([])
      setAddMove(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setAddMove(true)
  }

  const handleBack = () => {
    setAddMove(false)
  }

  if (addMove) {
    return (
      <div>
         <CreateMoves workoutName={workoutName} date={date} handleBack={handleBack} deleteWholeWorkout={deleteWholeWorkout}
          user={user} setPage={setPage} exercises={exercises} setExercises={setExercises}
        />
      </div>
    )
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
            {/*<div className="mb-3">
              <label htmlFor="workoutName" className="form-label">Workout Name</label>
              <input
                type="text"
                className="form-control"
                id="workoutName"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                required
              />
            </div>*/}
            <div className="mb-3">
              <label htmlFor="workoutName" className="form-label">Workout Name</label>
              <select
                className="form-select"
                id="workoutName"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                required
              >
                <option value="">Choose...</option>
                <option value="Whole body">Whole body</option>
                <option value="Lower body">Lower body</option>
                <option value="Upper body">Upper body</option>
                <option value="Push">Push</option>
                <option value="Pull">Pull</option>
                <option value="Legs">Legs</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Submit-nappi */}
            <button type="submit" className="btn btn-primary btn-block">To exercises</button>
            <button onClick={deleteWholeWorkout} className="btn btn-danger ms-4">Delete whole workout</button>
          </form>
        </div>
      </div>
    </div>
  )
}

const CreateMoves = ( { workoutName, date, user, setPage, exercises, setExercises, handleBack, deleteWholeWorkout }) => {
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [message, setMessage] = useState(null)

  const handleAddExercise = () => {
    if (name && reps > 0) {
      const newExercise = { name, weight: weight || 0, reps }
      setExercises([...exercises, newExercise])
      setWeight('')
      setReps('')
    } else if (!name) {
      alert('Please fill in at least Exercise Name and reps')
    } else if (reps < 1 || !reps) {
      alert('Reps must be at least 1')
    } else {
      alert('Error adding exercise')
    }
  }


  const handleSaveWorkout = async () => {
    if (exercises.length > 0) {

    
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
      setMessage('workout created')
      setTimeout(() => {
        setMessage(null)
        setPage('workouts')
      }, 2000)
    } catch (error) {
      console.error('Error creating workout', error)
    }
    } else {
      alert("Your workout must contain at least 1 exercise")
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
      {message && (
        <div className="alert alert-success" role="alert">{message}</div>
      )}
      <button className="btn btn-warning" onClick={handleBack}>Back</button>
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
          min="0"
          onChange={(e) => setWeight(e.target.value)}
        />
        <label htmlFor="reps" className="form-label mr-3">Reps</label>
        <input
          type="number"
          className="form-control me-2"
          id="reps"
          value={reps}
          min="1"
          onChange={(e) => setReps(e.target.value)}
        />
        <button type="button" className="btn btn-primary" onClick={handleAddExercise}>Add Exercise</button>
      </div>
      <div className="mb-3">
       
      </div>
      {/*workout details */}
      <div className="row">
        <h2 className="mb-4">{workoutName} &nbsp; {date}</h2>
        <ExercisesListed exercises={exercises} handleDeleteExercise={handleDeleteExercise} indexes={[0, 10]} />
        <ExercisesListed exercises={exercises} handleDeleteExercise={handleDeleteExercise} indexes={[10, 20]} />
        <ExercisesListed exercises={exercises} handleDeleteExercise={handleDeleteExercise} indexes={[20, 30]} />
      </div>
      <button type="button" className="btn btn-success ms-2 mt-4" onClick={handleSaveWorkout}>Save Workout</button>
      <button onClick={deleteWholeWorkout} className="btn btn-danger mt-4 ms-4">Delete whole workout</button>
    </div>
  )
}

const ExercisesListed = ({ exercises, handleDeleteExercise, indexes }) => {
  return (
    <div className="col">
      <ul className="list-group list-group-flush">
        {exercises.slice(indexes[0], indexes[1]).map((exercise, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            <span>{index + 1 + indexes[0]}. {exercise.name} - {exercise.weight} kg x {exercise.reps}</span>
            <button onClick={() => handleDeleteExercise(index + indexes[0])} type="button" className="btn btn-danger btn-sm">
              <span aria-hidden="true">&times;</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewWorkouts