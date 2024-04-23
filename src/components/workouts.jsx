import { useState } from 'react'

const Workouts = ({user, setUser}) => {
  const [addWorkout, setAddWorkout] = useState(false)

  const handleAddWorkout = () => {
    setAddWorkout(true)
  }

  if (!user) {
    return (
      <>
        <h2>You must be logged in to see your workouts</h2>
      </>
    )
  }

  return (
    <div>
     <h2>tähän tulee myöhemmin lista treeneistä</h2>
    </div>
  )
}

const CreateWorkout = () => {
  const [date, setDate] = useState('')
  const [workoutName, setWorkoutName] = useState('')
  const [addMove, setAddMove] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    // Tässä voit käsitellä lomakkeen lähettämistä, esim. lähettää tiedot backendiin
    console.log('Submitted:', { date, workoutName })
    setAddMove(true)
  }

  if (addMove) {
    return <CreateMoves />
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

const CreateMoves = () => {
  const [exerciseName, setExerciseName] = useState('')
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [exercises, setExercises] = useState([])

  const handleAddExercise = () => {
    if (exerciseName && weight && reps) {
      const newExercise = { exerciseName, weight, reps }
      setExercises([...exercises, newExercise])
      // Nollaa kentät lisäyksen jälkeen
      setExerciseName('');
      setWeight('');
      setReps('');
    } else {
      alert('Please fill in all fields.');
    }
  }

  const handleSaveWorkout = () => {
    // Tässä voit käsitellä tallennusta, esim. lähettää tiedot backendiin
    console.log('Saved workout:', exercises)
    // Tyhjennä harjoituslista tallennuksen jälkeen
    setExercises([])
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Workout Form</h2>
      <div className="mb-3">
        <label htmlFor="exerciseName" className="form-label">Exercise Name</label>
        <input
          type="text"
          className="form-control"
          id="exerciseName"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="weight" className="form-label">Weight (kg)</label>
        <input
          type="number"
          className="form-control"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reps" className="form-label">Reps</label>
        <input
          type="number"
          className="form-control"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={handleAddExercise}>Add Exercise</button>
        <button type="button" className="btn btn-success ms-2" onClick={handleSaveWorkout}>Save Workout</button>
      </div>
      <div>
        <h3>Exercises</h3>
        <ul>
          {exercises.map((exercise, index) => (
            <li key={index}>
              <strong>{exercise.exerciseName}</strong> - {exercise.weight}kg x {exercise.reps}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Workouts