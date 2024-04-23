import { useState } from 'react'
import Login from './components/login'
import Workouts from './components/workouts'
import NavBar from './components/navbar'
import NewWorkouts from './components/newWorkout'

//git testi
function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('workouts')


  return (
    <div>
      <NavBar user={user} setPage={setPage} setUser={setUser}/>

      {page === 'workouts' ? (
        <Workouts user={user} setUser={setUser} page={page} setPage={setPage}/>
      ) : page === 'login' ? (
        <div className="login">
          <Login setUser={setUser} user={user} setPage={setPage}/>
        </div>
      ) : page === 'newWorkout' ? (
        <NewWorkouts user={user} setUser={setUser} page={page} setPage={setPage}/>
      ) : (
        <div>404 - page not found</div>
      )}
      {/*!user ? (
        <div className="login">
          <Login setUser={setUser}/>
        </div>
      ) : (
        <Workouts user={user} setUser={setUser} />
      )*/}
    </div>
      
  )
}

export default App
