import "./Result.css"
import axios from "../../axios/axios";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const ParticipantResult = () => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const [loading, setLoading] = useState();
    const [isAsideLoading, setIsAsideLoading] = useState(false);
    const [combinedData, setCombinedData] = useState([]);
    const [results, setResults] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [quizId, setQuizId] = useState([]);

    const [selectedResultId, setSelectedResultId] = useState("");
    const [resultDetails, setResultDetails] = useState([]);
    const navigate = useNavigate();

    async function getResults(quizId) {
        try {
            setIsAsideLoading(true);

            const response = await axios.get(`Result/get-quiz-result?quizId=${quizId}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });

            const { data } = response;
            if (data) {
                setIsAsideLoading(false);
                console.log(data);
            }

            setResults(data);
        } catch (error) {
            setIsAsideLoading(false);
            setResults([]);
        }
    }

    useEffect(() => {


        getResults();
    }, [user.accessToken]);

    useEffect(() => {
        async function getQuizzes() {
            try {
                setLoading(true);

                const response = await axios.get(`Quiz/get-all-published-quizzes`, {

                });

                const { data } = response;
                if (data) {
                    setLoading(false);
                }

                setQuizzes(data);

            } catch (error) {

            }

        }

        getQuizzes()
    }, []);



    async function ShowDetails(submissionId) {
        try {
            setLoading(true);

            const resultQuestionsResponse = await axios.get(`Result/get-questions-and-answers-of-submitted-answers?submissionId=${submissionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            const submittedAnswersResponse = await axios.get(`Result/get-submitted-answers?submissionId=${submissionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            const resultResponse = await axios.get(`Result/get-single-result?submissionId=${submissionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            const resultQuestions = resultQuestionsResponse.data;
            const submittedAnswers = submittedAnswersResponse.data;
            const resultDetails = resultResponse.data;

            const updatedCombinedData = resultQuestions.map((resultQuestion) => {
                const submittedAnswer = submittedAnswers.find(answer => answer.questionId === resultQuestion.questionID);
                return {
                    ...resultQuestion,
                    submittedAnswerId: submittedAnswer ? submittedAnswer.answerId : null,
                    isCorrect: submittedAnswer.isCorrect
                };
            });

            setCombinedData(updatedCombinedData);
            console.log(updatedCombinedData);
            setLoading(false);

            setSelectedResultId(submissionId);
            setResultDetails(resultDetails);
        } catch (error) {

            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                console.error(error.response);
                // setError(error.response.data);
            }
        }
    };



    return <>
        <div id="result-page-content">

            <header id="result-header">
                Header
            </header>

            <aside id="result-aside" style={{ overflowY: 'auto' }}>

                <div className="mb-4">
                    <label className="form-label" htmlfor="halls">Quiz</label>
                    <div className="select-container">
                        <select
                            value={quizId}
                            onChange={e => {
                                setQuizId(e.target.value);
                                getResults(e.target.value);
                            }}
                            required
                            className="form-control form-select"
                        >
                            <option hidden value="">
                                --- Select Quiz ---
                            </option>

                            {quizzes.length > 0 &&
                                quizzes.map(quiz => {
                                    return (
                                        <option key={quiz.quizId} value={quiz.quizId}>
                                            {quiz.quizName}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>

                </div>

                {isAsideLoading && <div className="" style={{ textAlign: 'center' }}><Loading /> </div>}

                <div>

                    {results.length > 0 ? (
                        results.map((result, i) => {
                            const truncatedText = new Date(result.submissionTime).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                                // timeZone: 'UTC'
                            });

                            return (
                                <div onClick={() => ShowDetails(result.submissionId)} className={`unpublished-questions p-2 d-flex justify-content-between ${selectedResultId === result.submissionId ? 'selected-result' : ''}`} key={result.submissionId}>
                                    <div className="question-text me-0">
                                        <button disabled className="btn btn-dark">{i + 1}</button> <span className={`mt-auto mb-auto question-text ${selectedResultId === result.submissionId ? 'text-light' : ''}`}>{truncatedText}</span>
                                    </div>

                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center mt-3">No Results</div>
                    )}

                </div>
            </aside>

            <main id="result-main" style={{ overflowY: 'auto' }}>

                <div className="mb-4">
                    {loading ? (
                        <div className="mt-5" style={{ textAlign: 'center' }}>
                            <Loading />
                        </div>
                    ) : (
                        <div>

                            {combinedData.map((combinedItem, i) => (
                                <div key={combinedItem.questionID}>
                                    <button disabled className="btn btn-dark">{i + 1}</button>
                                    <h3>{combinedItem.question}</h3>
                                    <div className="question-picture mb-4 mt-4">
                                        <img src={combinedItem.questionImage || require('./images/question.png')} className="question-picture" alt="Default Quiz" />
                                    </div>
                                    <ul>
                                        {combinedItem.answers.map((answer) => {
                                            const isAnswerCorrect = answer.isCorrect;
                                            const isCheckedAnswer = answer.answerId === combinedItem.submittedAnswerId;

                                            return (
                                                <div className="fs-5" key={answer.answerId}>
                                                    <label className={isCheckedAnswer ? 'checked' : ''}>
                                                        <input
                                                            type="radio"
                                                            name={combinedItem.questionID}
                                                            value={answer.answerId}
                                                            defaultChecked={isCheckedAnswer}
                                                            disabled
                                                        />
                                                        {answer.answerText}
                                                    </label>
                                                    {isCheckedAnswer && (
                                                        <span className={`${isAnswerCorrect ? 'correct-answer' : 'wrong-answer'} ms-2`}>
                                                            {isAnswerCorrect ? <i class="fa-solid fa-check text-light p-1"></i> : <i class="fa-solid fa-x text-light p-1"></i>}
                                                        </span>
                                                    )}
                                                    {isAnswerCorrect && !isCheckedAnswer && (
                                                        <span className="correct-answer ms-2">
                                                            <i class="fa-solid fa-check text-light p-1"></i>
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </ul>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>

            <section id="result-section" style={{ overflowY: 'auto' }}>
                <div>
                    Score : {resultDetails.score}
                </div>
                <hr />
                <div>
                    Overall score : {resultDetails.overallScore}
                </div>
            </section>

        </div>

    </>
}

export default ParticipantResult;