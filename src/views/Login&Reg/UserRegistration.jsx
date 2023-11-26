import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import "./Login.css"

function UserRegistration(props) {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState();

    async function submitHandler(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post("Authentication/register-user",
                { username, email, password, firstName, lastName });

            if (response.status === 200) {
                setIsLoading(false);
                setError(false);
                setSuccess(response.data);

                // navigate("/login");
                console.log(response.data);
            }

        } catch (error) {
            setIsLoading(false);
            setSuccess(false);
            console.log(error.response.data);
            setError(error.response.data);
        }
    }

    useEffect(() => {
        // let errorTimeoutId;
        let successTimeoutId;

        // if (error) {
        //     errorTimeoutId = setTimeout(() => {
        //         setError(null);
        //     }, 7000);
        // }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
            }, 3000);
        }

        return () => {
            // clearTimeout(errorTimeoutId);
            clearTimeout(successTimeoutId);
        };

    }, [success]);


    return <div><>

        <section className="vh-100 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-5 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-7 mb-5 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5">

                                <form className="form" onSubmit={submitHandler}>

                                    <h4 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Register</h4>

                                    {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}

                                    {error && (
                                        <div className="alert alert-danger">
                                            {typeof error === "object" ? (
                                                Object.values(error).map((messages, index) => (
                                                    <ul key={index}>
                                                        {messages.map((message, i) => (
                                                            <li key={i}>{message}</li>
                                                        ))}
                                                    </ul>
                                                ))
                                            ) : (
                                                <div className="text-center">{error}</div>
                                            )}
                                        </div>
                                    )}

                                    {success && <div className="me-4 ms-4 alert alert-success text-center">{success}</div>}

                                    <div className="d-flex justify-content-around justify-content-around">
                                        <div className="me-2 mb-4">
                                            <div className="">
                                                <label className="form-label" htmlfor="form3Example1">First name</label>
                                                <input type="text" id="form3Example1" maxLength={15} value={firstName} onChange={e => setFirstname(e.target.value)} required className="form-control" />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="">
                                                <label className="form-label" htmlfor="form3Example2">Last name</label>
                                                <input type="text" id="form3Example2" maxLength={15} value={lastName} onChange={e => setLastname(e.target.value)} required className="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-around">
                                        <div className="me-2 mb-4">
                                            <label className="form-label" htmlfor="form3Example3">Email address</label>
                                            <input type="email" id="form3Example3" value={email} onChange={e => setEmail(e.target.value)} required className="form-control" />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label" htmlfor="form3Example6">Username</label>
                                            <input type="text" id="form3Example6" value={username} onChange={e => setUsername(e.target.value)} required className="form-control" />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-around">
                                        <div className="me-2">
                                            <div className="">
                                                <label className="form-label" htmlfor="form3Example4">Password</label>
                                                <input type="password" id="form3Example4" maxLength={20} minLength={4} value={password} onChange={e => setPassword(e.target.value)} required className="form-control" />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="">
                                                <label className="form-label" htmlfor="form3Example5">Confirm Password</label>
                                                <input type="password" id="form3Example4" maxLength={20} minLength={4} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="login-button btn btn-dark mb-4">
                                            <i class="fa-solid fa-user-plus text-light"></i>
                                        </button>
                                    </div>

                                    <p className="mb-2 pb-lg-2 text-center">Already have an account? <Link to="/login"
                                        style={{ color: '#393f81' }}>Login here</Link></p>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>

    </div>
}

export default UserRegistration;