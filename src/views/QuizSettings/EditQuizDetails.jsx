import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";

const EditQuizDetails = () => {

    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const quizId = param.get("quizId");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState();
    const [quizName, setQuizName] = useState();
    const [quizDescription, setQuizDescription] = useState();

    const user = JSON.parse(localStorage.getItem("userDetails"));

    async function getQuizDetails() {
        try {
            setLoading(true);

            const response = await axios.get(`Quiz/get-quiz-details?quizId=${quizId}`, {

            });

            const { data } = response;
            if (data) {
                setLoading(false);
                setQuizName(data.quizName)
                setQuizDescription(data.quizDescription)
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function updateQuizDetails(e) {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await axios.put(`Quiz/update-quiz?quizId=${quizId}`, { quizName, quizDescription }, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });

            const { data } = response;
            if (data) {
                setLoading(false);
                console.log(data);
                setSuccess(data);
            }

        } catch (error) {
            console.error(error);
            setError(error.response);
        }
    }


    useEffect(() => {

        getQuizDetails();
    }, []);

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

            <div className="container px-4 py-4 px-md-5 text-lg-start my-">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-12 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="bg-glass">
                            <div className="px-4 py-5 px-md-5">

                                <ul className="nav nav-tabs d-flex justify-content-between p-3" id="myTab" role="tablist">

                                    <Link to={`/view-admin-questions-in-quiz/${quizId}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="adminQuestion-tab" data-bs-toggle="tab" data-bs-target="#adminQuestion-tab-pane" type="button" role="tab" aria-controls="adminQuestion-tab-pane" aria-selected="true"> Questions </p>
                                        </li>
                                    </Link>

                                    <Link to={`/edit-quiz-details?quizId=${quizId}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="edit-tab" data-bs-toggle="tab" data-bs-target="#edit-tab-pane" type="button" role="tab" aria-controls="edit-tab-pane" aria-selected="false">Edit </p>
                                        </li>
                                    </Link>

                                    <Link to={`/edit-quiz-image?quizId=${quizId}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="quizImage-tab" data-bs-toggle="tab" data-bs-target="#quizImage-tab-pane" type="button" role="tab" aria-controls="quizImage-tab-pane" aria-selected="false">Image</p>
                                        </li>
                                    </Link>

                                    <Link to={`/view-quiz-records/${quizId}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="quizRecord-tab" data-bs-toggle="tab" data-bs-target="#quizRecord-tab-pane" type="button" role="tab" aria-controls="quizRecord-tab-pane" aria-selected="false">Records</p>
                                        </li>
                                    </Link>

                                </ul >


                                <div className="card col-lg-6 ms-auto me-auto bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">

                                        <Link to={`/single-admin-quiz/${quizId}`}>
                                            <button className="btn btn-danger"><i class="fa-solid fa-arrow-left text-light"></i></button>
                                        </Link>
                                        <form className="form" onSubmit={updateQuizDetails}>
                                            <h4 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Edit Details</h4>

                                            {loading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}
                                            {error && <div className="me-4 ms-4 alert alert-danger text-center">{error}</div>}
                                            {success && <div className="me-4 ms-4 alert alert-success text-center">{success}</div>}

                                            <div className="">
                                                <div className="text-center mb-2">
                                                    {/* <button onClick={getQuizDetails} className="btn btn-dark">show quiz details</button> */}
                                                </div>
                                                <div className="mb-4 form-group">
                                                    <label className="form-label">Quiz Name</label>
                                                    <input
                                                        type="text"
                                                        value={quizName}
                                                        onChange={e => setQuizName(e.target.value)}
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="mb-4 form-group">
                                                    <label className="form-label">Quiz Description</label>
                                                    <textarea
                                                        type="text"
                                                        rows={4}
                                                        value={quizDescription}
                                                        onChange={e => setQuizDescription(e.target.value)}
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

export default EditQuizDetails;