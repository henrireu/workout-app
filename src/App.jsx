import { useState, useEffect } from 'react'
import workoutService from './services/workouts'
import Login from './components/login'
import Workouts from './components/workouts'
import NavBar from './components/navbar'
import NewWorkouts from './components/newWorkout'
import Home from './components/home'

//git testi
function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('home')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      workoutService.setToken(user.token)
    }
  },[])

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
      ) : page === 'home' ? (
        <Home />
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
