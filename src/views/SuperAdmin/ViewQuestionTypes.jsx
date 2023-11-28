import "./Settings.css"
import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommentLoading from "../../components/CommentLoading";
import Loading from "../../components/Loading";

const ViewQuestionTypes = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [isLoading, setIsLoading] = useState();
    const [questionTypes, setQuestionTypes] = useState([]);
    const [isQuestionTypeLoading, setIsQuestionTypeLoading] = useState();

    const [typeName, setTypeName] = useState("");
    const [numberOfOptions, setNumberOfOptions] = useState("");
    const [scoreWeight, setScoreWeight] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function getQuestionTypes() {

        try {
            setIsLoading(true);

            const response = await axios.get(`QuestionType/get-all-questionTypes`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
            );

            if (response.status === 200) {
                setIsLoading(false);
                setQuestionTypes(response.data)
                console.log(response);
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
            }
        }
    }


    useEffect(() => {

        getQuestionTypes();
    }, []);


    async function submitHandler(e) {
        e.preventDefault();

        if (typeName == "" || numberOfOptions == "" || scoreWeight == "") {
            setError("Fill in all the fields");
            return;
        }

        try {
            setIsQuestionTypeLoading(true);

            const response = await axios.post(`QuestionType/add-questionType`, { typeName, numberOfOptions, scoreWeight },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
            );

            if (response.status === 200) {
                setIsQuestionTypeLoading(false);
                getQuestionTypes();
                console.log(response);
                setSuccess(response.data);
                // setError('');
            }
        } catch (error) {
            setIsQuestionTypeLoading(false);

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

        <section className="vh-110 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-4 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-12 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="bg-glass">
                            <div className="px-4 py-5 px-md-5">

                                <ul className="nav nav-tabs d-flex justify-content-between p-3" id="myTab" role="tablist">

                                    <Link to="/view-admins">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="adminView-tab" data-bs-toggle="tab" data-bs-target="#adminView-tab-pane" type="button" role="tab" aria-controls="adminView-tab-pane" aria-selected="false"> Admins </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-users">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="userView-tab" data-bs-toggle="tab" data-bs-target="#userView-tab-pane" type="button" role="tab" aria-controls="userView-tab-pane" aria-selected="false"> Users </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-categories">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="viewCategory-tab" data-bs-toggle="tab" data-bs-target="#viewCategory-tab-pane" type="button" role="tab" aria-controls="viewCategory-tab-pane" aria-selected="false">Categories</p>
                                        </li>
                                    </Link>                                    

                                    <Link to="/view-questionTypes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="viewQuestionTypes-tab" data-bs-toggle="tab" data-bs-target="#viewQuestionTypes-tab-pane" type="button" role="tab" aria-controls="viewQuestionTypes-tab-pane" aria-selected="false">View QT</p>
                                        </li>
                                    </Link>                                    

                                </ul >

                                <div className="card col-lg-12 ms-auto me-auto bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">

                                        <div className="d-flex justify-content-around pb-3">
                                            <h4 className="fw-normal text-center" style={{ letterSpacing: '1px' }}>Question Types</h4>

                                            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#AddQuestionTypeModal" title="Add Category">
                                                <i class="fa-solid fa-plus text-light"></i>
                                            </button>
                                        </div>

                                        {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><CommentLoading /> </div>}

                                        <div style={{ height: '600px', overflowY: 'auto' }}>

                                            <table class="table table-hover">
                                                <thead>
                                                    <tr className="fs-5">
                                                        <th scope="col">#</th>
                                                        <th scope="col">Question Type</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        questionTypes.length > 0 ? questionTypes.map((questionType, i) => (
                                                            <tr className="fs-5">
                                                                <th scope="row">{i + 1}</th>
                                                                <td>{questionType?.typeName}</td>
                                                            </tr>
                                                        )) : (
                                                            <>
                                                                <div className="text-center mt-3">
                                                                    <h2>No Question Types</h2>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="modal fade" id="AddQuestionTypeModal" tabindex="-1" aria-labelledby="AddQuestionTypeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="AddQuestionTypeModalLabel">Add Question Type</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        {isQuestionTypeLoading && <div className="" style={{ textAlign: 'center' }}><Loading /> </div>}
                        {error && <div className="alert alert-danger text-center">{error}</div>}
                        {success && <div className="alert alert-success text-center">{success}</div>}

                        <form>
                            <div className="mb-4 col-md-12 form-group">
                                <label className="form-label">Question Type</label>
                                <input
                                    type="text"
                                    value={typeName}
                                    onChange={e => setTypeName(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <div className="d-flex">

                                <div className="mb-4 col-md-6 form-group">
                                    <label className="form-label">Options</label>
                                    <input
                                        type="text"
                                        value={numberOfOptions}
                                        onChange={e => setNumberOfOptions(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-4 col-md-6 form-group">
                                    <label className="form-label">Score</label>
                                    <input
                                        type="text"
                                        value={scoreWeight}
                                        onChange={e => setScoreWeight(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button onClick={submitHandler} type="button" class="btn btn-success">Add</button>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default ViewQuestionTypes;