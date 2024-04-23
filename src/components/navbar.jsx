import dumbbell from '../pictures/dumbbell.jpg'

const Navbar = ({ user, setPage, setUser }) => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            {/* Logo */}
            <a className="navbar-brand" href="#">
              <img src={dumbbell} alt="Logo" height="30" className="d-inline-block align-top" />
            </a>
            {/* Home */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a onClick={() => setPage('workouts')} className="nav-link" href="#">Your Workouts</a>
              </li>
            </ul>
            {/*Create workout*/}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a onClick={() => setPage('newWorkout')} className="nav-link" href="#">New workout</a>
              </li>
            </ul>
          </div>
          {/* Login */}
          { user === null ? (
            <button onClick={() => setPage('login')} className="btn btn-outline-primary" type="button">Login</button>
          ) : (
            <div className="ms-auto">
               <span className="navbar-text me-2">{user.username}</span>
               <button onClick={() => setUser(null)} className="btn btn-outline-primary" type="button">Log Out</button>
            </div>
          )}
          
        </div>
      </nav>
    );
  };
  
  export default Navbar;