import { useParams } from "react-router";
import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import "./ParticipantQuiz.css";

const TakeQuiz = () => {
    let params = useParams();
    const id = params.id;
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState({});
    const [category, setCategory] = useState([]);

    const [loading, setLoading] = useState();
    const [submitloading, setSubmitLoading] = useState();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitStoredAnswers, setsubmitStoredAnswers] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 1,
        totalItems: 0,
        totalPages: 0
    });


    useEffect(() => {
        async function getQuiz() {
            try {
                setLoading(true);

                const response = await axios.get(`Quiz/get-quiz/${id}`, {
                });

                const { data } = response;
                if (data) {
                    setLoading(false);
                    setQuiz(data);
                }

            } catch (error) {

            }
        }
        getQuiz()
    }, [id]);


    useEffect(() => {
        async function getCategory() {
            try {

                const response = await axios.get(`Quiz/get-quiz-categories/${id}`, {
                });

                const { data } = response;
                if (data) {
                    setCategory(data);
                }

            } catch (error) {
                console.error(error)
            }
        }
        getCategory()
    }, [id]);

    const handleSelectAnswer = (questionId, answerId) => {
        const updatedSelectedAnswers = { ...selectedAnswers, [questionId]: answerId };
        setSelectedAnswers(updatedSelectedAnswers);

        const updatedStoredAnswers = Object.entries(updatedSelectedAnswers).map(([qId, aId]) => ({
            questionId: qId,
            answerId: aId
        }));

        localStorage.setItem('selectedAnswers', JSON.stringify(updatedSelectedAnswers));
        localStorage.setItem('submitSelectedAnswers', JSON.stringify(updatedStoredAnswers));
    };

    async function getQuestions() {
        try {
            setLoading(true);

            const response = await axios.get(`Question/get-questions-in-quiz/${id}`, {
                params: {
                    PageNumber: pagination.currentPage,
                    PageSize: pagination.itemsPerPage
                }
            });

            const { data } = response;
            if (data) {
                setLoading(false);
                setQuestions(data)
                const paginationHeader = JSON.parse(response.headers["pagination"]);
                setPagination(paginationHeader);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }

    useEffect(() => {

        getQuestions()
    }, [pagination.itemsPerPage, pagination.currentPage]);

    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem('selectedAnswers'));
        if (storedAnswers) {
            setSelectedAnswers(storedAnswers);
        }
    }, []);

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

    function clearAnswerDetails() {
        localStorage.removeItem('selectedAnswers');
        localStorage.removeItem('submitSelectedAnswers');
    }

    const submitQuiz = async () => {
        setsubmitStoredAnswers(JSON.parse(localStorage.getItem('submitSelectedAnswers')))

        // if (submitStoredAnswers.length === 0) {
        //     alert("Please select answers before submitting the quiz.");
        //     return;
        // }

        // console.log('Stored Answers:', submitStoredAnswers);

        try {
            setSubmitLoading(true);
            const response = await axios.post(`Quiz/submit-quiz?quizId=${id}`, { answers: submitStoredAnswers },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            if (response.status === 200) {
                setSubmitLoading(false);
                setSuccess(response.data);
                clearAnswerDetails();
                navigate("/");
            }
            // Handle successful submission
            console.log(response);
        } catch (error) {
            // Handle errors
            console.error('Error submitting quiz:', error);
        }
    };

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

    return (
        <>
            <section className="vh-110 background-radial-gradient overflow-hidden">

                <div className="container px-4 py-4 px-md-5 text-lg-start my-">
                    <div className="row gx-lg-5 align-items-center mb-4">

                        <div className="col-lg-10 ms-auto me-auto mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="bg-glass">
                                <div className="px-4 py-5 px-md-5">

                                    <div className="d-flex justify-content-around mb-3">

                                        <div className="text-center col-md-5 fs-5 d-flex flex-column justify-content-around">
                                            <h3 className="">{quiz.quizName}</h3>
                                        </div>
                                    </div>

                                    <div style={{ height: questions.length > 0 ? '700px' : '500px' }} className="card ms-auto me-auto bg-glass">
                                        <div className="card-body px-4 py-4 px-md-5">

                                            <section className="h-100 gradient-custom">
                                                <div className="container">
                                                    <div className="row d-flex justify-content-center my-4">
                                                        {loading ? <div className="mt-5" style={{ textAlign: 'center' }}><Loading /></div> :
                                                            <div>
                                                                {questions.map((question) => (
                                                                    <div key={question.questionID}>
                                                                        <h3>{question.question}</h3>
                                                                        <div className="question-picture mb-5 mt-5">
                                                                            <img src={question.questionImage || require('./images/question.png')} className="question-picture" alt="Default Quiz" />
                                                                        </div>
                                                                        <ul>
                                                                            {question.answers.map((answer) => (
                                                                                <div className="fs-5" key={answer.answerId}>
                                                                                    <label>
                                                                                        <input
                                                                                            
                                                                                            type="radio"
                                                                                            name={question.questionID}
                                                                                            value={answer.answerId}
                                                                                            checked={selectedAnswers[question.questionID] === answer.answerId}
                                                                                            onChange={(e) => handleSelectAnswer(question.questionID, e.target.value)}
                                                                                        />
                                                                                        {answer.answerText}
                                                                                    </label>
                                                                                </div>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        }

                                                        {questions.length > 0 && (
                                                            <div className="text-center">
                                                                <div className="ms-2 mb-1">
                                                                    <button className="btn btn-sm btn-light p-1 m-1" onClick={handlePrevPage} disabled={pagination.currentPage === 1}>Previous</button>
                                                                    <span className="text-dark"> Question: {pagination.currentPage} of {pagination.totalPages === 0 ? 1 : pagination.totalPages} </span>
                                                                    <button className="btn btn-sm btn-light p-1 m-1" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.totalPages}>Next</button>
                                                                </div>

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success mt-3"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#submitQuizModal"
                                                                    data-mdb-toggle="tooltip"
                                                                    title="Submit Quiz"
                                                                >
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        )}
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

            <div className="modal fade" id="submitQuizModal" tabindex="-1" aria-labelledby="submitQuizModalLabel" aria-hidden="true">
                <div className="modal-dialog text-light">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-light" id="submitQuizModalLabel">Submit Quiz</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {submitloading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}

                            <div className="text-light">
                                Are you sure you want Submit?
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                            <button
                                className="btn btn-success text-light"
                                data-bs-dismiss="modal"
                                onClick={submitQuiz}
                            >
                                Confirm
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TakeQuiz;
