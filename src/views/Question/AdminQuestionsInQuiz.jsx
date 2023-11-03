import "./Question.css"
import { useParams } from "react-router";
import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const AdminQuestionsInQuiz = () => {
    let params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const [loading, setLoading] = useState();
    const [questionCount, setQuestionCount] = useState("");
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

    const [questions, setQuestions] = useState([]);
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0
    });

    async function getQuestions() {
        try {
            setLoading(true);

            const response = await axios.get(`Question/get-admin-questions-in-quiz/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                },
                params: {
                    PageNumber: pagination.currentPage,
                    PageSize: pagination.itemsPerPage
                }
            });

            const { data } = response;
            if (data) {
                setLoading(false);
                setQuestions(data);
                setQuestionCount(data[0].questionCount);

                const paginationHeader = JSON.parse(response.headers["pagination"]);
                setPagination(paginationHeader);
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {

        getQuestions()
    }, [pagination.itemsPerPage, pagination.currentPage, user.accessToken]);

    function handleNextPage() {
        setPagination(prev => {
            if (prev.currentPage < prev.totalPages) {
                return { ...prev, currentPage: prev.currentPage + 1 };
            }
            return prev;
        });
    }

    function handlePrevPage() {
        setPagination(prev => {
            if (prev.currentPage > 1) {
                return { ...prev, currentPage: prev.currentPage - 1 };
            }
            return prev;
        });
    }

    function handleFirstPage() {
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    }

    function handleLastPage() {
        setPagination(prev => ({ ...prev, currentPage: pagination.totalPages }));
    }

    async function DeleteQuestion(questionId) {
        try {
            const deleteResponse = await axios.delete(`Question/delete-question?questionId=${questionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
            );

            if (deleteResponse.status === 200) {
                setSelectedQuestionId(null); // Reset selected question ID
                console.log(deleteResponse);
                getQuestions();
                // setError('');
            }
        } catch (error) {

        }
    }

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

                                    <Link to="/change-names">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="names-tab" data-bs-toggle="tab" data-bs-target="#names-tab-pane" type="button" role="tab" aria-controls="names-tab-pane" aria-selected="true"> Questions </p>
                                        </li>
                                    </Link>

                                    <Link to="/change-username">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="username-tab" data-bs-toggle="tab" data-bs-target="#username-tab-pane" type="button" role="tab" aria-controls="username-tab-pane" aria-selected="false"> Admin </p>
                                        </li>
                                    </Link>

                                    <Link to="/change-email">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="email-tab" data-bs-toggle="tab" data-bs-target="#email-tab-pane" type="button" role="tab" aria-controls="email-tab-pane" aria-selected="false"> Bank </p>
                                        </li>
                                    </Link>

                                    <Link to="/change-password">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" type="button" role="tab" aria-controls="password-tab-pane" aria-selected="false">Edit </p>
                                        </li>
                                    </Link>

                                    <Link to="/two-factor-authentication">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="2fa-tab" data-bs-toggle="tab" data-bs-target="#2fa-tab-pane" type="button" role="tab" aria-controls="2fa-tab-pane" aria-selected="false">Image</p>
                                        </li>
                                    </Link>
                                    
                                </ul >

                                <div style={{ height: questions.length > 0 ? '800px' : '500px' }} className="card ms-auto me-auto bg-glass">
                                    <div className="card-body px-4 py-4 px-md-5">

                                        <div className="row d-flex justify-content-center my-4">
                                            <div className="">
                                                {loading ? <div className="mt-5" style={{ textAlign: 'center' }}><Loading /> </div> :
                                                    <div className="card mb-4">
                                                        <div className="card-header py-3 d-flex justify-content-between">
                                                            <button className="btn btn-danger" onClick={goBack}>Go Back</button>

                                                            <h5 className="mb-0 fs-4">
                                                                Questions - {questionCount}{' '}
                                                                {questions.length === 1
                                                                    ? 'Question'
                                                                    : questions.length > 1
                                                                        ? 'Questions'
                                                                        : 'No Questions'}
                                                            </h5>

                                                            <Link to="/add-questions-to-bank"><button className="btn btn-success">Add Question</button></Link>
                                                        </div>

                                                        {questions.length === 0 ? <div className="d-flex justify-content-between alert alert-primary mb-4 mt-4 p-4 fs-5">No Questions<Link to="/add-questions-to-bank">Add From Here</Link></div>
                                                            :
                                                            <div className="card-body" style={{ height: '600px', overflowY: 'auto' }}>
                                                                {questions.map(question => {

                                                                    return <>
                                                                        <div className="row">

                                                                            <div className="col-lg-3 col-md-12 mb- mb-lg-0 d-flex flex-column justify-content-between">
                                                                                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                                                    <img src={question.imageUrl || require('./question.png')}
                                                                                        className="w-100 quest-picture" alt="Question Item" />
                                                                                    <Link to="/">
                                                                                        <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                                                                    </Link>
                                                                                </div>

                                                                            </div>

                                                                            <div className="col-lg- col-md-9 mb-4 mb-lg-0">
                                                                                <p className="fs-5"><strong>{question.questionText}</strong></p>
                                                                                <p><strong>Answer: {question.correctAnswer} </strong></p>

                                                                                <div className="mt-2">
                                                                                    {question.questionTypeName}
                                                                                </div>

                                                                                <div>
                                                                                    {question.categoryName}
                                                                                </div>
                                                                            </div>

                                                                            <div>
                                                                                <hr className="my-3" />
                                                                            </div>

                                                                        </div>


                                                                    </>

                                                                })}

                                                            </div>
                                                        }

                                                        {questions.length > 0 && (
                                                            <div className="text-center">
                                                                <div className="ms-2 mb-1">
                                                                    <button className="btn btn-sm btn-light p-1 m-1" onClick={handleFirstPage} disabled={pagination.currentPage === 1}>First</button>
                                                                    <button className="btn btn-sm btn-light p-1 m-1" onClick={handlePrevPage} disabled={pagination.currentPage === 1}>Previous</button>
                                                                    <span className="text-dark"> Page: {pagination.currentPage} of {pagination.totalPages === 0 ? 1 : pagination.totalPages} </span>
                                                                    <button className="btn btn-sm btn-light p-1 m-1" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.totalPages}>Next</button>
                                                                    <button className="btn btn-sm btn-light p-1 m-1" onClick={handleLastPage} disabled={pagination.currentPage === pagination.totalPages}>Last</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                }
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="modal fade" id="deleteQuestionModal" tabindex="-1" aria-labelledby="deleteQuestionModalLabel" aria-hidden="true">
            <div className="modal-dialog text-light">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-light" id="deleteQuestionModalLabel">Delete Question</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-light">
                        Are you sure you want to delete this Question?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                        <button
                            className="btn btn-danger text-light"
                            data-bs-dismiss="modal"
                            onClick={() => DeleteQuestion(selectedQuestionId)}
                        >
                            Confirm
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AdminQuestionsInQuiz;