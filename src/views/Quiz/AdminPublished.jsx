import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import "./Quiz.css"

const AdminPublished = () => {
    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [loading, setLoading] = useState();
    const [quizzes, setQuizzes] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 8,
        totalItems: 0,
        totalPages: 0
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function getQuizzes() {
            try {
                setLoading(true);

                const response = await axios.get(`Quiz/get-admin-published-quizzes`, {
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
                }

                setQuizzes(data);

                const paginationHeader = JSON.parse(response.headers["pagination"]);
                setPagination(paginationHeader);
            } catch (error) {

            }

        }

        getQuizzes()
    }, [pagination.itemsPerPage, pagination.currentPage, user.accessToken]);

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

                                    <Link to="/create-quiz">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="names-tab" data-bs-toggle="tab" data-bs-target="#names-tab-pane" type="button" role="tab" aria-controls="names-tab-pane" aria-selected="true"> Create </p>
                                        </li>
                                    </Link>
                                    <Link to="/admin-quizzes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="email-tab" data-bs-toggle="tab" data-bs-target="#email-tab-pane" type="button" role="tab" aria-controls="email-tab-pane" aria-selected="false"> Admin Quizzes </p>
                                        </li>
                                    </Link>

                                    <Link to="/admin-published-quizzes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" type="button" role="tab" aria-controls="password-tab-pane" aria-selected="false">Published </p>
                                        </li>
                                    </Link>

                                    <Link to="/admin-unpublished-quizzes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="2fa-tab" data-bs-toggle="tab" data-bs-target="#2fa-tab-pane" type="button" role="tab" aria-controls="2fa-tab-pane" aria-selected="false">Unpublished</p>
                                        </li>
                                    </Link>

                                </ul >

                                <div style={{ height: quizzes.length > 0 ? '800px' : '600px' }} className="card ms-auto me-auto bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">

                                        {loading ? <div className="mt-5" style={{ textAlign: 'center' }}><Loading /> </div> :

                                            <div style={{ height: '730px', overflowY: 'auto' }}>
                                                <div class="vh-110 container px-1 text-center">

                                                    <div className="row">
                                                        {quizzes.length > 0 ? (
                                                            quizzes.map(quiz => (
                                                                <div className="col-md-3 d-flex justify-content-evenly ms-auto me-auto" key={quiz.id}>
                                                                    <div className="card mt-4 home-card">
                                                                        <Link to={`/single-admin-quiz/${quiz.quizId}`}>
                                                                            <img src={quiz.imageUrl || require('./images/QuizDefault.jpg')} className="home-card-image card-img-top p-3" alt="Default Quiz" />
                                                                            <div className="card-body text-center fs-5">
                                                                                <h3 className="card-title">{quiz.quizName}</h3>
                                                                                <hr />
                                                                                <p className="card-description">{quiz.quizDescription}</p>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="col-12 text-center">
                                                                <h4>No quizzes</h4>
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>

                                                {quizzes.length > 0 && (
                                                    <div className="mt-3">
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
        </section>
    </>
}

export default AdminPublished;