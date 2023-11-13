import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const AdminRegistration = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [isLoading, setIsLoading] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function submitHandler(e) {
        e.preventDefault();

        try {
            setIsLoading(true);

            const response = await axios.post(`Authentication/register-admin`, { email, firstName, lastName },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
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
            }, 10000);
        }

        return () => {
            clearTimeout(errorTimeoutId);
            clearTimeout(successTimeoutId);
        };

    }, [error, success]);

    return <>

        <section className="vh-100 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-4 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-12 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="bg-glass">
                            <div className="px-4 py-5 px-md-5">

                                <ul className="nav nav-tabs d-flex justify-content-between p-3" id="myTab" role="tablist">

                                    <Link to="/admin-registration">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="adminReg-tab" data-bs-toggle="tab" data-bs-target="#adminReg-tab-pane" type="button" role="tab" aria-controls="adminReg-tab-pane" aria-selected="true"> Add Admin </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-admins">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="adminView-tab" data-bs-toggle="tab" data-bs-target="#adminView-tab-pane" type="button" role="tab" aria-controls="adminView-tab-pane" aria-selected="false"> View Admins </p>
                                        </li>
                                    </Link>

                                    <Link to="/add-category">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="addCategory-tab" data-bs-toggle="tab" data-bs-target="#addCategory-tab-pane" type="button" role="tab" aria-controls="addCategory-tab-pane" aria-selected="false">Add Category </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-categories">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="viewCategory-tab" data-bs-toggle="tab" data-bs-target="#viewCategory-tab-pane" type="button" role="tab" aria-controls="viewCategory-tab-pane" aria-selected="false">Categories</p>
                                        </li>
                                    </Link>

                                    <Link to="/add-questionType">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="addQuestionType-tab" data-bs-toggle="tab" data-bs-target="#addQuestionType-tab-pane" type="button" role="tab" aria-controls="addQuestionType-tab-pane" aria-selected="false">Add QT </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-questionTypes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="viewQuestionTypes-tab" data-bs-toggle="tab" data-bs-target="#viewQuestionTypes-tab-pane" type="button" role="tab" aria-controls="viewQuestionTypes-tab-pane" aria-selected="false">View QT</p>
                                        </li>
                                    </Link>

                                </ul >

                                <div className="card col-lg-7 ms-auto me-auto bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">

                                        <form className="form" onSubmit={submitHandler}>
                                            <h4 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Register Admin Account</h4>

                                            {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}
                                            {error && <div className="me-4 ms-4 alert alert-danger text-center">{error}</div>}
                                            {success && <div className="me-4 ms-4 alert alert-success text-center">{success}</div>}

                                            <div className="d-flex">

                                                <div className="mb-4 col-md-6 form-group">
                                                    <label className="form-label">First Name</label>
                                                    <input
                                                        type="text"
                                                        value={firstName}
                                                        onChange={e => setFirstName(e.target.value)}
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="mb-4 col-md-6 form-group">
                                                    <label className="form-label">Last Name</label>
                                                    <input
                                                        type="text"
                                                        value={lastName}
                                                        onChange={e => setLastName(e.target.value)}
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4 col-md-12 form-group">
                                                <label className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="text-center">

                                                <button type="submit" className="btn btn-dark ms-auto me-auto">
                                                    Register
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

        {/* <section className="vh-100 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-2 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-7 mt-5 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5">

                                <form className="form" onSubmit={submitHandler}>
                                    <h4 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Register Admin Account</h4>

                                    {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}
                                    {error && <div className="me-4 ms-4 alert alert-danger text-center">{error}</div>}
                                    {success && <div className="me-4 ms-4 alert alert-success text-center">{success}</div>}

                                    <div className="d-flex">

                                        <div className="mb-4 col-md-6 form-group">
                                            <label className="form-label">First Name</label>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="mb-4 col-md-6 form-group">
                                            <label className="form-label">Last Name</label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={e => setLastName(e.target.value)}
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4 col-md-12 form-group">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="text-center">

                                        <button type="submit" className="btn btn-dark ms-auto me-auto">
                                            Register
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
    </>
}

export default AdminRegistration;