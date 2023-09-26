import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import "./Account.css"

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState();
    const navigate = useNavigate();


    async function submitHandler(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`Authentication/forgot-password?email=${email}`);

            if (response.status === 200) {
                setIsLoading(false);
                setSuccess(response.data);

                console.log(response.data);
            }

        } catch (error) {
            setIsLoading(false);
            setError(error.response.data);
        }

    };


    useEffect(() => {
        let errorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
            }, 5000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
                navigate("/reset-password");
                // window.location.reload();
            }, 3000);
        }

        return () => {
            clearTimeout(errorTimeoutId);
            clearTimeout(successTimeoutId);
        };

    }, [error, success, navigate]);

    return <>
        <section className="vh-100 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-5 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-7 mb-5 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5">

                                <form className="form" onSubmit={submitHandler}>

                                    <h4 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Forgot Password</h4>

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


                                    <div className="mb-4 ms-4 me-4">
                                        <label className="form-label" htmlfor="form3Example3">Email address</label>
                                        <input type="email" id="form3Example3" value={email} onChange={e => setEmail(e.target.value)} required className="form-control" />
                                    </div>


                                    <div className="text-center ">
                                        <button type="submit" className="login-button btn btn-dark mb-4">
                                            Execute
                                        </button>
                                    </div>

                                    <p className="mb-2 pb-lg-2 text-center">Remember it now? <Link to="/login"
                                        style={{ color: '#393f81' }}>Login here</Link></p>

                                    <p className="mb-2 pb-lg-2 text-center">Go to <Link to="/reset-password"
                                        style={{ color: '#393f81' }}>Reset Password</Link></p>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default ForgotPassword;