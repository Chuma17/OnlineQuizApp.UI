import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"


const Login = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("Authentication/login", { username, password });

            if (response.status === 200) {
                setIsLoading(false);

                const currentTime = new Date().getTime();
                localStorage.setItem('userDetails', JSON.stringify(response.data));
                localStorage.setItem('userDetailsTimestamp', currentTime);
                navigate("/");
                console.log(response.data);
            }

        } catch (error) {
            setIsLoading(false);
            setError(error.response.data);
        }

    };

    useEffect(() => {
        let errorTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
            }, 3000);
        }

        return () => {
            clearTimeout(errorTimeoutId);
        };

    }, [error]);

    return <>

        <section className="vh-100 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-5 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-9 mb-5 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="card bg-glass">

                            <div className="row g-0">

                                <div className="col-md-6 col-lg-5 d-none d-md-block mt-auto mb-auto">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                        alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>

                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body px-4 py-5 px-md-5 p-4 p-lg-5 text-black">
                                        <form className="form" onSubmit={submitHandler}>

                                            <h4 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Login</h4>

                                            {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}
                                            {error && <div className="alert alert-danger text-center" style={{ letterSpacing: '1px' }}>{error}</div>}

                                            <div className="mb-2">
                                                <label className="form-label" htmlFor="userNameAddress">Email / Username</label>
                                                <input
                                                    type="text"
                                                    id="userNameAddress"
                                                    value={username}
                                                    onChange={e => setUserName(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="userPassword">Password</label>
                                                <input
                                                    type="password"
                                                    id="userPassword"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>

                                            <button type="submit" className="login-button text-light btn btn-dark btn-block w-25 mb-4 mt-4">
                                                Sign In
                                            </button>
                                            <p className="mb-0 pb-lg-2 text-center"><Link to="/"
                                                style={{ color: '#393f81' }}>Go to Home</Link></p>


                                            <p className="mb-2 pb-lg-2 text-center">Don't have an account? <Link to="/user-registration"
                                                style={{ color: '#393f81' }}>Register here</Link></p>


                                        </form>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>



        {/* <section className="vh-110 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-5 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 d-flex justify-content-center align-items-center h-100">

                    <div className="col col-xl-9 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="card bg-glass" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">

                                <div className="col-md-6 col-lg-5 d-none d-md-block mt-auto mb-auto">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                        alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>

                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body px-4 py-5 px-md-5 p-4 p-lg-5 text-black">

                                        <form className="form" onSubmit={submitHandler}>

                                            <h4 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Login</h4>

                                            {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}
                                            {error && <div className="ms-4 alert alert-danger text-center" style={{ letterSpacing: '1px' }}>{error}</div>}

                                            <div className="mb-2 ms-4">
                                                <label className="form-label" htmlFor="userNameAddress">Email / User Name</label>
                                                <input
                                                    type="text"
                                                    id="userNameAddress"
                                                    value={username}
                                                    onChange={e => setUserName(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="mb-3 ms-4">
                                                <label className="form-label" htmlFor="userPassword">Password</label>
                                                <input
                                                    type="password"
                                                    id="userPassword"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>

                                            <button type="submit" className="login-button text-light btn btn-dark btn-block w-25 ms-4 mb-4 mt-4">
                                                Sign In
                                            </button>
                                            <p className="mb-0 pb-lg-2 text-center"><Link to="/OnlineQuizApp.UI">Go to Home</Link></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}

    </>
}

export default Login;