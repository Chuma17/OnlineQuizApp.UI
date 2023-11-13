import "./HomePage.css"
import axios from "../axios/axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HomePage = () => {

    const [loading, setLoading] = useState();
    const [quizzes, setQuizzes] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 8,
        totalItems: 0,
        totalPages: 0
    });

    useEffect(() => {
        async function getQuizzes() {
            try {
                setLoading(true);

                const response = await axios.get(`Quiz/get-published-quizzes`, {
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

    return <>
        {loading ? <div className="mt-5" style={{ textAlign: 'center' }}><Loading /> </div> :

            <div >
                <div className="container px-1 text-center">

                    <div className="row">
                        {quizzes.map(quiz => (
                            <div className="col-md-3 d-flex justify-content-evenly" key={quiz.id}>

                                <Link to={`/single-participant-quiz/${quiz.quizId}`}>
                                    <div className="card mt-4 home-card">
                                        <img src={quiz.imageUrl || require('./images/QuizDefault.jpg')} className="home-card-image card-img-top p-3" alt="Default Quiz" />

                                        <div className="card-body text-center fs-5">
                                            <h3 className="card-title">{quiz.quizName}</h3>
                                            <hr />
                                            <p className="card-description">{quiz.quizDescription}</p>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        ))}

                    </div>

                    <div className="ms-2 mb-5 mt-3">
                        <button className="btn btn-sm btn-light p-1 m-1" onClick={handleFirstPage} disabled={pagination.currentPage === 1}>First</button>
                        <button className="btn btn-sm btn-light p-1 m-1" onClick={handlePrevPage} disabled={pagination.currentPage === 1}>Previous</button>
                        <span className="text-dark"> Page: {pagination.currentPage} of {pagination.totalPages === 0 ? 1 : pagination.totalPages} </span>
                        <button className="btn btn-sm btn-light p-1 m-1" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.totalPages}>Next</button>
                        <button className="btn btn-sm btn-light p-1 m-1" onClick={handleLastPage} disabled={pagination.currentPage === pagination.totalPages}>Last</button>
                    </div>

                </div>
                
            </div>
        }        
    </>

}

export default HomePage;