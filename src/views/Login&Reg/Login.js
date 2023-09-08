import { useState } from "react";
import axios from "../../axios/axios";
import { Link, useNavigate } from "react-router-dom";


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
                navigate("/OnlineQuizApp.UI");
                console.log(response.data);
            }

        } catch (error) {
            setIsLoading(false);
            setError(error.response.data.message);
        }

    };

    return <>
        <section className="vh-110" >
            <div className="container py-5 mt-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-7">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">

                                <div className="col-md-6 col-lg-5 d-none d-md-block mt-auto mb-auto">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                        alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>

                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form className="form" onSubmit={submitHandler}>

                                            <h5 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Login</h5>

                                            {error && <div className="me-4 ms-4 alert alert-danger text-center" style={{ letterSpacing: '1px' }}>{error}</div>}

                                            <div className="mb-2 me-4 ms-4">
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

                                            <div className="mb-3 me-4 ms-4">
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
                                                {isLoading ? 'LOADING' : 'Sign in'}
                                            </button>
                                            <p className="mb-0 pb-lg-2 text-center"><Link to="/">Go to Home</Link></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>
}

export default Login;