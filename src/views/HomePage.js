import "./HomePage.css"
import axios from "../axios/axios";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

const HomePage = () => {

    const [loading, setLoading] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 4,
        totalItems: 0,
        totalPages: 0
    });

    useEffect(() => {
        async function getQuizzes() {
            try {
                setLoading(true);

                const response = await axios.get(`Quiz/get-all-unpublished-quizzes`, {
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
    }, [pagination.itemsPerPage, pagination.currentPage]);

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

    function handlePageSizeChange(e) {
        const newSize = parseInt(e.target.value, 10);
        setPagination(prev => ({ ...prev, itemsPerPage: newSize, currentPage: 1 }));
    }

    return <>
        {loading ? <div className="mt-5" style={{ textAlign: 'center' }}><Loading /> </div> :

            <div >
                <div class="container px-1 text-center">

                    <div className="row">
                        {quizzes.map(quiz => (
                            <div className="col-md-3 d-flex justify-content-evenly">

                                <div className="card mt-4 home-card">
                                    <img src={quiz.imageUrl || require('./images/QuizDefault.jpg')} className="home-card-image card-img-top p-3" alt="Default Quiz" />

                                    <div className="card-body text-center fs-5">
                                        <h3 className="card-title">{quiz.quizName}</h3>
                                        <hr />
                                        <p className="card-description">{quiz.quizDescription}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="mt-3">
                    <div className="ms-2 mb-1">
                        <button className="btn btn-sm btn-light p-1 m-1" onClick={handleFirstPage} disabled={pagination.currentPage === 1}>First</button>
                        <button className="btn btn-sm btn-light p-1 m-1" onClick={handlePrevPage} disabled={pagination.currentPage === 1}>Previous</button>
                        <span className="text-light"> Page: {pagination.currentPage} of {pagination.totalPages} </span>
                        <button className="btn btn-sm btn-light p-1 m-1" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.totalPages}>Next</button>
                        <button className="btn btn-sm btn-light p-1 m-1" onClick={handleLastPage} disabled={pagination.currentPage === pagination.totalPages}>Last</button>
                    </div>

                    {/* Input field for dynamic page size */}
                    <div className="ms-3 mb-3">
                        <span>Page Size: </span>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={pagination.itemsPerPage}
                            onChange={handlePageSizeChange}
                        />
                    </div>
                </div>

            </div>
        }
    </>

}

export default HomePage;