import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import "./Quiz.css"

const AdminQuizzes = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [isLoading, setIsLoading] = useState();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function submitHandler(e) {
        e.preventDefault();
        setError(false);
        setSuccess(false);
        try {
            setIsLoading(true);

            const response = await axios.post(`User/update-details`, { firstName, lastName },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
            );

            if (response.status === 200) {
                setIsLoading(false);

                user.firstName = firstName;
                user.lastName = lastName;

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
        <section className="vh-100 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-4 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-12 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="bg-glass">
                            <div className="px-4 py-5 px-md-5">

                                <ul className="nav nav-tabs d-flex justify-content-between p-3" id="myTab" role="tablist">

                                    <Link to="/create-quiz">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="names-tab" data-bs-toggle="tab" data-bs-target="#names-tab-pane" type="button" role="tab" aria-controls="names-tab-pane" aria-selected="true"> Create </p>
                                        </li>
                                    </Link>

                                    <Link to="/admin-quizzes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="email-tab" data-bs-toggle="tab" data-bs-target="#email-tab-pane" type="button" role="tab" aria-controls="email-tab-pane" aria-selected="false"> Admin Quizzes </p>
                                        </li>
                                    </Link>

                                    <Link to="/admin-published-quizzes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" type="button" role="tab" aria-controls="password-tab-pane" aria-selected="false">Published </p>
                                        </li>
                                    </Link>

                                    <Link to="/admin-unpublished-quizzes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="2fa-tab" data-bs-toggle="tab" data-bs-target="#2fa-tab-pane" type="button" role="tab" aria-controls="2fa-tab-pane" aria-selected="false">Unpublished</p>
                                        </li>
                                    </Link>

                                </ul >

                                <div className="card col-lg-6 ms-auto me-auto bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">

                                        <form className="form" onSubmit={submitHandler}>
                                            <h4 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Edit Names</h4>

                                            {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}
                                            {error && <div className="me-4 ms-4 alert alert-danger text-center">{error}</div>}
                                            {success && <div className="me-4 ms-4 alert alert-success text-center">{success}</div>}

                                            <div className="">

                                                <div className="mb-4 form-group">
                                                    <label className="form-label">First Name</label>
                                                    <input
                                                        type="text"
                                                        value={firstName}
                                                        onChange={e => setFirstName(e.target.value)}
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="mb-4 form-group">
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

                                            <div className="text-center">

                                                <button type="submit" className="edit-button btn btn-dark w-25 btn-block ms-auto me-auto">
                                                    Edit
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

export default AdminQuizzes;