import "./Question.css"
import { useParams } from "react-router";
import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const AdminQuestionsInQuiz = () => {
    let params = useParams();
    const id = params.id;

    const [loading, setLoading] = useState();
    const [questionCount, setQuestionCount] = useState("");

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

                                    <Link to={`/view-admin-questions-in-quiz/${id}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="adminQuestion-tab" data-bs-toggle="tab" data-bs-target="#adminQuestion-tab-pane" type="button" role="tab" aria-controls="adminQuestion-tab-pane" aria-selected="true"> Questions </p>
                                        </li>
                                    </Link>

                                    <Link to={`/edit-quiz-details?quizId=${id}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="edit-tab" data-bs-toggle="tab" data-bs-target="#edit-tab-pane" type="button" role="tab" aria-controls="edit-tab-pane" aria-selected="false">Edit </p>
                                        </li>
                                    </Link>

                                    <Link to={`/edit-quiz-image?quizId=${id}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="quizImage-tab" data-bs-toggle="tab" data-bs-target="#quizImage-tab-pane" type="button" role="tab" aria-controls="quizImage-tab-pane" aria-selected="false">Image</p>
                                        </li>
                                    </Link>

                                    <Link to={`/view-quiz-records/${id}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="quizRecord-tab" data-bs-toggle="tab" data-bs-target="#quizRecord-tab-pane" type="button" role="tab" aria-controls="quizRecord-tab-pane" aria-selected="false">Records</p>
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
                                                            <Link to={`/single-admin-quiz/${id}`}>
                                                                <button className="btn btn-danger"><i class="fa-solid fa-arrow-left text-light"></i></button>
                                                            </Link>

                                                            <h5 className="mb-0 fs-4">
                                                                {questionCount}{''}
                                                                {questions.length === 1
                                                                    ? 'Q'
                                                                    : questions.length > 1
                                                                        ? 'Q'
                                                                        : 'Empty'}
                                                            </h5>

                                                            <Link to="/add-questions-to-bank"><button className="btn btn-success"><i class="fa-solid fa-plus text-light"></i></button></Link>
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
                                                                <div className="ms-2 mb-1 pagination-icons">
                                                                    <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handleFirstPage} disabled={pagination.currentPage === 1}><i class="fa-solid fa-backward"></i></button>
                                                                    <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handlePrevPage} disabled={pagination.currentPage === 1}><i class="fa-solid fa-caret-left"></i></button>
                                                                    <span className="text-dark"> Page: {pagination.currentPage} of {pagination.totalPages === 0 ? 1 : pagination.totalPages} </span>
                                                                    <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.totalPages}><i class="fa-solid fa-caret-right"></i></button>
                                                                    <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handleLastPage} disabled={pagination.currentPage === pagination.totalPages}><i class="fa-solid fa-forward"></i></button>
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
    </>
}

export default AdminQuestionsInQuiz;