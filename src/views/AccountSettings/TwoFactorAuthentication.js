import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import "./Account.css"

const TwoFactorAuthentication = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [isLoading, setIsLoading] = useState();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function submitHandler(e) {
        e.preventDefault();
        setError(false);
        setSuccess(false);
        try {
            setIsLoading(true);

            const response = await axios.post(`Authentication/enable-disable-2FA`, {},
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
            );

            if (response.status === 200) {
                setIsLoading(false);

                if (user.twofactorenabled) {
                    user.twofactorenabled = false;
                }
                else {
                    user.twofactorenabled = true;
                }

                const updatedStudent = JSON.stringify(user);
                localStorage.setItem('userDetails', updatedStudent);

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
                setError(error.response.data);
            }
        }
    }

    useEffect(() => {
        let errorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
            }, 2000);
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

            <div className="container px-4 py-4 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-12 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="bg-glass">
                            <div className="px-4 py-5 px-md-5">

                                <ul className="nav nav-tabs d-flex justify-content-between p-3" id="myTab" role="tablist">

                                    <Link to="/change-names">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="names-tab" data-bs-toggle="tab" data-bs-target="#names-tab-pane" type="button" role="tab" aria-controls="names-tab-pane" aria-selected="true"> Names </p>
                                        </li>
                                    </Link>

                                    <Link to="/change-username">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="username-tab" data-bs-toggle="tab" data-bs-target="#username-tab-pane" type="button" role="tab" aria-controls="username-tab-pane" aria-selected="false"> Username </p>
                                        </li>
                                    </Link>

                                    <Link to="/change-email">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="email-tab" data-bs-toggle="tab" data-bs-target="#email-tab-pane" type="button" role="tab" aria-controls="email-tab-pane" aria-selected="false"> Email </p>
                                        </li>
                                    </Link>

                                    <Link to="/change-password">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" type="button" role="tab" aria-controls="password-tab-pane" aria-selected="false">Password </p>
                                        </li>
                                    </Link>

                                    <Link to="/two-factor-authentication">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="2fa-tab" data-bs-toggle="tab" data-bs-target="#2fa-tab-pane" type="button" role="tab" aria-controls="2fa-tab-pane" aria-selected="false">Two Factor</p>
                                        </li>
                                    </Link>

                                    <Link to="/profile-picture">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</p>
                                        </li>
                                    </Link>
                                </ul >

                                <div className="card col-lg-7 ms-auto me-auto bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">

                                        <form className="form" onSubmit={submitHandler}>
                                            <h4 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Enable / Disable <br /> Two Factor Authentication</h4>
                                            <hr />
                                            {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}
                                            {error && <div className="me-4 ms-4 alert alert-danger text-center">{error}</div>}
                                            {success && <div className="me-4 ms-4 alert alert-success text-center">{success}</div>}

                                            <p className="fs-5">
                                                Prevent hackers from accessing your account with an additional layer of security.
                                                When you sign in, 2-Step verification helps make sure your personal information 
                                                stays private, safe and secure.
                                            </p>

                                            <hr />

                                            <p className="fs-5">Current Status: {user.twofactorenabled ? "ENABLED" : "DISABLED"}</p>

                                            <div className="text-center mt-4">

                                                <button type="submit" className="edit-button btn btn-dark w-25 btn-block ms-auto me-auto">
                                                    {user.twofactorenabled ? "Disable" : "Enable"}
                                                </button>
                                            </div>

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

export default TwoFactorAuthentication;