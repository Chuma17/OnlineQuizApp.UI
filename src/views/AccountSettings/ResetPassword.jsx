import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import "./Account.css"

const ResetPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");

    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function submitHandler(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError(false);
        setSuccess(false);
        try {
            setIsLoading(true);

            const response = await axios.post(`Authentication/reset-password`,
                { password, confirmPassword, email, token }

            );

            if (response.status === 200) {
                setIsLoading(false);

                console.log(response);
                setSuccess(response.data);
                // setError('');
            }
        } catch (error) {
            setIsLoading(false);

            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                setIsLoading(false);

                console.error(error.response);

                if (error.response.data.errors) {
                    setError(error.response.data.errors)
                }
                else {
                    setError(error.response.data)
                }

            }
        }
    }

    useEffect(() => {
        let errorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
            }, 7000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
            }, 2000);
        }

        return () => {
            clearTimeout(errorTimeoutId);
            clearTimeout(successTimeoutId);
        };

    }, [error, success]);

    return <>
        <section className="vh-110 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-5 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-7 mb-5 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5">

                                <form className="form ms-4 me-4" onSubmit={submitHandler}>

                                    <h4 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Reset Password</h4>

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


                                    <div className="mb-4">
                                        <label className="form-label" htmlfor="form3Example3">Email address</label>
                                        <input type="email" id="form3Example3" value={email} onChange={e => setEmail(e.target.value)} required className="form-control" />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="">
                                                <label className="form-label" htmlfor="form3Example4">New Password</label>
                                                <input type="password" id="form3Example4" maxLength={20} minLength={4} value={password} onChange={e => setPassword(e.target.value)} required className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <div className="">
                                                <label className="form-label" htmlfor="form3Example5">Confirm Password</label>
                                                <input type="password" id="form3Example4" maxLength={20} minLength={4} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 form-group">
                                        <label className="form-label">Token</label>
                                        <textarea
                                            type="text"
                                            rows={6}
                                            value={token}
                                            onChange={e => setToken(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>


                                    <div className="text-center ">
                                        <button type="submit" className="login-button btn btn-dark mb-4">
                                            Execute
                                        </button>
                                    </div>

                                    <p className="mb-2 pb-lg-2 text-center">It's never too late to <Link to="/login"
                                        style={{ color: '#393f81' }}>Login here</Link></p>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default ResetPassword;