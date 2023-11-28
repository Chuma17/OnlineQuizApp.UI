import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

const SuperAdminQuizRecords = () => {
    let params = useParams();
    const id = params.id;

    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const adminId = param.get("adminId");

    const [loading, setLoading] = useState();
    const [quizParticipants, setquizParticipants] = useState([]);

    const user = JSON.parse(localStorage.getItem("userDetails"));
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0
    });

    async function getQuizParticipants() {
        try {
            setLoading(true);

            const response = await axios.get(`Quiz/get-quiz-participants/${id}`, {
                params: {
                    PageNumber: pagination.currentPage,
                    PageSize: pagination.itemsPerPage
                }
            });

            const { data } = response;
            if (data) {
                setLoading(false);
                setquizParticipants(data);
                console.log(data)
                const paginationHeader = JSON.parse(response.headers["pagination"]);
                setPagination(paginationHeader);
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {

        getQuizParticipants()
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

                        <div style={{ height: quizParticipants.length > 0 ? '800px' : '600px' }} className="bg-glass">
                            <div className="px-4 py-5 px-md-5">

                                <ul className="nav nav-tabs d-flex justify-content-between p-3" id="myTab" role="tablist">

                                    <Link to={`/view-superAdmin-questions-in-quiz/${id}?adminId=${adminId}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="adminQuestion-tab" data-bs-toggle="tab" data-bs-target="#adminQuestion-tab-pane" type="button" role="tab" aria-controls="adminQuestion-tab-pane" aria-selected="true"> Questions </p>
                                        </li>
                                    </Link>                                    

                                    <Link to={`/view-superAdmin-quiz-records/${id}?adminId=${adminId}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="quizRecord-tab" data-bs-toggle="tab" data-bs-target="#quizRecord-tab-pane" type="button" role="tab" aria-controls="quizRecord-tab-pane" aria-selected="false">Records</p>
                                        </li>
                                    </Link>

                                </ul >



                                <div className="row d-flex justify-content-center my-4">
                                    <div className="">
                                        {loading ? <div className="mt-5" style={{ textAlign: 'center' }}><Loading /> </div> :
                                            <div className="card mb-4">
                                                <div className="card-header py-3 d-flex">
                                                    <Link to={`/superAdmin-published-quizzes/${adminId}?adminId=${adminId}`}>
                                                        <button className="btn btn-danger"><i class="fa-solid fa-arrow-left text-light"></i></button>
                                                    </Link>                                                    
                                                    <h5 className="text-center mt-auto mb-auto ms-auto me-auto">
                                                        Participants
                                                    </h5>
                                                </div>



                                                <div style={{ height: quizParticipants.length > 0 ? 'fit-content' : '' }}>
                                                    <table class="table table-hover">

                                                        <thead>
                                                            <tr className="fs-5">
                                                                <th scope="col">#</th>
                                                                <th scope="col">Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                quizParticipants.length > 0 ? quizParticipants.map((participant, i) => (

                                                                    <tr className="fs-5">
                                                                        <th scope="row">{i + 1}</th>
                                                                        <td>{participant?.firstName} {participant?.lastName} ({participant.count})</td>
                                                                        <td><Link to={`/quiz-result/${participant.id}?quizId=${id}`}><button className="btn btn-success go-to-result"><i class="fa-solid fa-arrow-right text-light"></i></button></Link></td>
                                                                    </tr>

                                                                )) : (
                                                                    <>
                                                                        <div className="text-center mt-3">
                                                                            <h2>No Participants</h2>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>

                                                {quizParticipants.length > 0 && (
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
        </section>
    </>
}

export default SuperAdminQuizRecords;