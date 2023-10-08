import "./Question.css"
import axios from "../../axios/axios";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const AdminQuestionsInBank = () => {
    const [loading, setLoading] = useState();

    const [questions, setQuestions] = useState([]);
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 8,
        totalItems: 0,
        totalPages: 0
    });

    async function getQuestions() {
        try {
            setLoading(true);

            const response = await axios.get(`Question/get-admin-questions-in-bank`, {
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

                                <ul className="nav nav-tabs d-flex justify-content-around p-3" id="myTab" role="tablist">

                                    <Link to="/view-admin-questions-in-bank">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="names-tab" data-bs-toggle="tab" data-bs-target="#names-tab-pane" type="button" role="tab" aria-controls="names-tab-pane" aria-selected="true"> Admin Questions </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-all-questions">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="email-tab" data-bs-toggle="tab" data-bs-target="#email-tab-pane" type="button" role="tab" aria-controls="email-tab-pane" aria-selected="false"> All Questions </p>
                                        </li>
                                    </Link>

                                </ul >

                                <div style={{ height: questions.length > 0 ? '800px' : '430px' }} className="card ms-auto me-auto bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">

                                        <section className="h-100 gradient-custom">
                                            <div className="container py-5">
                                                <div className="row d-flex justify-content-center my-4">
                                                    <div className="col-md-8">
                                                        <div className="card mb-4">
                                                            <div className="card-header py-3 d-flex justify-content-between">
                                                                <h5 className="mb-0 fs-4">Questions - {questions && questions.length} {questions.length === 1 && <span>item</span>} {questions.length > 1 && <span>items</span>}
                                                                </h5>
                                                                <button className="btn btn-dark btn-outline-danger">Empty Cart</button>
                                                            </div>

                                                            {questions.length === 0 ? <div className="d-flex justify-content-between alert alert-primary mb-4 mt-4 p-4">No Questions<Link to="/add-questions-to-bank">Add From Here</Link></div>
                                                                :
                                                                <div className="card-body">
                                                                    {questions.map(item => {

                                                                        return <div className="row">

                                                                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                                                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                                                    <img src={item.image}
                                                                                        className="w-100" alt="Image Item" />
                                                                                    <a href="#!">
                                                                                        <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                                                                    </a>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                                                <p className="fs-4"><strong>{item.name}</strong></p>
                                                                                <p><strong>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae magnam sint, deleniti ut</strong></p>
                                                                                <button type="button" className="btn btn-danger btn-sm mt-2 me-1"
                                                                                    data-mdb-toggle="tooltip" title="Remove item">
                                                                                    <i className="fas fa-trash"></i>
                                                                                </button>
                                                                            </div>

                                                                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

                                                                                <p className="text-start text-md-center fs-5">

                                                                                </p>
                                                                            </div>

                                                                            <hr className="my-4" />
                                                                            <hr className="my-4" />

                                                                        </div>
                                                                    })}

                                                                </div>
                                                            }
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </section>

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

export default AdminQuestionsInBank;