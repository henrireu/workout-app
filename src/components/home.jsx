/*const Home = () => {

    return (
        <div>
            <p>This is simple workout logging site. You must create user and to be logged in for logging workouts. This site is made for computer users, so if you are using
                mobile, it might not work well always. Mobile app is coming in future.
            </p>
        </div>
    )
}*/

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Welcome to Simple Workout Logger!</h2>
                            <p className="card-text">
                                This is a simple workout logging site. You must create a user and log in to record your workouts.
                                Please note that this site is optimized for computer users, so mobile experience might not always be optimal.
                                However, a mobile app is in development and will be available in the future.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home