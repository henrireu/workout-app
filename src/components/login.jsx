import { useState, useEffect } from 'react'
import userService from '../services/users'
import loginService from '../services/login'
import guyImage from '../pictures/guy2.jpg'

const Login = ({ setUser, setPage}) => {
    const [kayttajatunnus, setKayttajatunnus] = useState('')
    const [salasana, setSalasana] = useState('')
    const [luoKayttajaTila, setLuoKayttajaTila] = useState(false)
    const [virheViesti, setVirheViesti] = useState(null)

    const handleKirjaudu = async (event) => {
        event.preventDefault()
        try {
          // täytyy muuttaa samaan muotoon mitä backendissä nimet että toimii
          const username = kayttajatunnus
          const password = salasana
          const kayttaja = await loginService.login({
            username, password,
          })
          setKayttajatunnus('')
          setSalasana('')
          setUser(kayttaja)
          setPage('workouts')
        } catch (exception) {
          setVirheViesti('wrong username or password')
          setTimeout(() => {
            setVirheViesti(null)
          }, 6000)
        }
    }

    if (luoKayttajaTila) {
        return (
            <div>
              <CreateUser setLuoKayttajaTila={setLuoKayttajaTila} setUser={setUser}/>
            </div>
        )
    }

    return (
      <SignIn
        handleKirjaudu={handleKirjaudu} 
        kayttajatunnus={kayttajatunnus}
        setKayttajatunnus={setKayttajatunnus}
        salasana={salasana}
        setSalasana={setSalasana}
        virheViesti={virheViesti}
        setLuoKayttajaTila={setLuoKayttajaTila}
      />
    )  
}


const CreateUser = ({ setLuoKayttajaTila, setUser }) => {
  const [kayttajatunnus, setKayttajatunnus] = useState('')
  const [salasana, setSalasana] = useState('')
  const [salasanaVarmistus, setSalasanaVarmistus] = useState('')
  const [virheViesti, setVirheViesti] = useState(null)
  const [viesti, setViesti] = useState(null)

  const handleLuoKayttaja = async (event) => {
    event.preventDefault()
    if (salasana === salasanaVarmistus) {
      console.log("oikein")
      try {
        const user = {
          username: kayttajatunnus,
          password: salasana
        }
        await userService.create(user)
        setViesti('User created')
        setTimeout(() => {
          setViesti(null)
          setLuoKayttajaTila(false)
        },2000)
  
      } catch (error){
        console.error(error)
        setVirheViesti('error creating account')
        setTimeout(() => {
          setVirheViesti(null)
        }, 3000)
      }
    } else {
      console.log("salasana väärin")
      setVirheViesti('passwords doesnt match')
      setTimeout(() => {
        setVirheViesti(null)
      }, 3000)
    }
  }


  return (
    <section>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3" style={{marginTop: "5%"}}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{borderRadius: "15px"}}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  {virheViesti && (
                      <div className="alert alert-danger" role="alert">{virheViesti}</div>
                  )}
                  {viesti && (
                      <div className="alert alert-success" role="alert">{viesti}</div>
                  )}
                  
                  <form onSubmit={handleLuoKayttaja}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input 
                        type="text" 
                        id="form3Example3cg" 
                        className="form-control form-control-lg"
                        value={kayttajatunnus}
                        onChange={({ target }) => setKayttajatunnus(target.value)} 
                      />
                      <label className="form-label" htmlFor="form3Example3cg">Your Username</label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input 
                        type="password" 
                        id="form3Example4cg" 
                        className="form-control form-control-lg"
                        value={salasana}
                        onChange={({ target }) => setSalasana(target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example4cg">Password</label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input 
                        type="password" 
                        id="form3Example4cdg" 
                        className="form-control form-control-lg" 
                        value={salasanaVarmistus}
                        onChange={({ target }) => setSalasanaVarmistus(target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                    </div>
                    <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!" className="fw-bold text-body"><u onClick={() => setLuoKayttajaTila(false)}>Login here</u></a></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

//className="vh-100" style={{ backgroundColor: "#757575" }}
const SignIn = ({ handleKirjaudu, kayttajatunnus, setKayttajatunnus, salasana, setSalasana, virheViesti, setLuoKayttajaTila }) => {
  return (
    <section>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img src={guyImage}
                  alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", height: "70%"}} />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleKirjaudu}>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                      <span className="h1 fw-bold mb-0">WorkoutX</span>
                    </div>
                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>
                    {virheViesti && (
                      <div className="alert alert-danger" role="alert">{virheViesti}</div>
                    )}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input 
                        type="text" 
                        id="form2Example17" 
                        className="form-control form-control-lg"
                        value={kayttajatunnus}
                        onChange={({ target }) => setKayttajatunnus(target.value)} 
                      />
                      <label className="form-label" htmlFor="form2Example17">Email address</label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password" 
                        id="form2Example27" 
                        className="form-control form-control-lg"
                        value={salasana}
                        onChange={({ target }) => setSalasana(target.value)} 
                      />
                      <label className="form-label" htmlFor="form2Example27">Password</label>
                    </div>
                    <div className="pt-1 mb-4">
                      <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                    </div>
                    <a className="small text-muted" href="#!">Forgot password?</a>
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                      Don't have an account?{' '}
                      <a onClick={() => setLuoKayttajaTila(true)} href="#!" style={{ color: "#393f81" }}>Register here</a>
                    </p>
                    <a href="#!" className="small text-muted">Terms of use.</a>
                    <a href="#!" className="small text-muted">Privacy policy</a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

/*const CreateUser = ({setLuoKayttajaTila, setUser}) => {
    const [kayttajatunnus, setKayttajatunnus] = useState('')
    const [salasana, setSalasana] = useState('')
    const [virheViesti, setVirheViesti] = useState(null)
    const [viesti, setViesti] = useState(null)

    const saveUser = async (event) => {
        event.preventDefault()
        console.log(kayttajatunnus, " ", salasana)

        try {
          const user = {
            username: kayttajatunnus,
            password: salasana
          }
          await userService.create(user)
          setViesti('Käyttäjä luotu')
          setTimeout(() => {
            setViesti(null)
            setLuoKayttajaTila(false)
          },2000)

        } catch (error){
          console.error(error)
          setVirheViesti('Viallinen käyttäjätunnus tai salasana')
          setTimeout(() => {
            setVirheViesti(null)
          }, 3000)
        }
    }

    return (
        <div>
          {virheViesti && (
            <h3 className="error">{virheViesti}</h3>
          )}
          {viesti && (
            <h3 className="message">{viesti}</h3>
          )}
            <form onSubmit={saveUser}>
                <div>
                  <input
                    type="text"
                    name="Käyttäjätunnus"
                    placeholder="Käyttäjätunnus"
                    value={kayttajatunnus}
                    onChange={({target}) => setKayttajatunnus(target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="Salasana"
                    placeholder="Salasana"
                    value={salasana}
                    onChange={({target}) => setSalasana(target.value)}
                  />
                </div>
                <button type="submit">Tallenna käyttäjä</button>
            </form>
            <button onClick={() => setLuoKayttajaTila(false)}>Takaisin</button>
        </div>
    )
}*/

export default Login