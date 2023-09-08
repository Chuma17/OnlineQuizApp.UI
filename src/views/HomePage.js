import "./HomePage.css"
import axios from "../axios/axios";
import { useEffect, useState } from "react";

const HomePage = () => {

    const [quizzes, setQuizzes] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 3,
        totalItems: 0,
        totalPages: 0
    });

    useEffect(() => {
        async function getQuizzes() {
            console.log("Fetching quizzes with page", pagination.currentPage, "and pageSize", pagination.itemsPerPage);

            const response = await axios.get(`Quiz/get-all-unpublished-quizzes`, {
                params: {
                    PageNumber: pagination.currentPage,
                    PageSize: pagination.itemsPerPage
                }
            });

            const { data } = response;
            setQuizzes(data);

            const paginationHeader = JSON.parse(response.headers["pagination"]);
            setPagination(paginationHeader);
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

    return (
        <div>

            <div className="row">
                {quizzes.map(quiz => (
                    <div className="col-md-4 d-flex justify-content-around">

                        <div className="card mt-4 mb-4" style={{ width: "18rem", borderRadius: "5%" }}>
                            <img src={quiz.imageUrl} className="card-img-top" style={{ height: "13rem", borderRadius: "5%" }} alt="..." />
                            <div className="card-body text-center fs-5">
                                <h3 className="card-title">{quiz.quizName}</h3>
                                <hr />
                                <p>{quiz.quizDescription}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div>
                <button className="btn btn-success p-2 m-1" onClick={handleFirstPage} disabled={pagination.currentPage === 1}>First</button>
                <button className="btn btn-success p-2 m-1" onClick={handlePrevPage} disabled={pagination.currentPage === 1}>Previous</button>
                <span> Page: {pagination.currentPage} of {pagination.totalPages} </span>
                <button className="btn btn-success p-2 m-1" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.totalPages}>Next</button>
                <button className="btn btn-success p-2 m-1" onClick={handleLastPage} disabled={pagination.currentPage === pagination.totalPages}>Last</button>
            </div>

            {/* Input field for dynamic page size */}
            <div>
                <span>Page Size:</span>
                <input
                    type="number"
                    min="1"
                    max="100"
                    value={pagination.itemsPerPage}
                    onChange={handlePageSizeChange}
                    className="form-control col-md-1"
                />
            </div>

        </div>

    )
}

export default HomePage;