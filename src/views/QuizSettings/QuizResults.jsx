import "./Result.css"
import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

const QuizResult = () => {
    let params = useParams();
    const userId = params.id;

    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const quizId = param.get("quizId");

    const user = JSON.parse(localStorage.getItem("userDetails"));
    const [loading, setLoading] = useState();
    const [isAsideLoading, setIsAsideLoading] = useState(false);
    const [combinedData, setCombinedData] = useState([]);
    const [results, setResults] = useState([]);

    const [selectedResultId, setSelectedResultId] = useState("");
    const [resultDetails, setResultDetails] = useState([]);
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    async function getResults() {
        try {
            setIsAsideLoading(true);

            const response = await axios.get(`Result/get-user-quiz-result/${userId}?quizId=${quizId}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });

            const { data } = response;
            if (data) {
                setIsAsideLoading(false);
                // console.log(data);
            }

            setResults(data);
        } catch (error) {
            setIsAsideLoading(false);
            setResults([]);
        }
    }

    useEffect(() => {


        getResults();
    }, [user.accessToken, quizId]);


    async function ShowDetails(submissionId) {
        try {
            setLoading(true);
            setSelectedResultId(submissionId);

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

            <header className="d-flex" id="result-header">
                <div className="mt-3 result-header-class">
                    <button className="btn btn-danger" onClick={goBack}><i class="fa-solid fa-arrow-left text-light"></i></button>
                </div>
                <div className="d-flex mt-4 mb-auto ms-auto me-auto result-header-class">
                    <div className="me-3">
                        Score : {resultDetails.score}
                    </div>
                    <div>
                        Overall score : {resultDetails.overallScore}
                    </div>
                </div>

                <button type="button" className="btn btn-dark result-button" data-bs-toggle="modal" data-bs-target="#quizResultModal">
                    <i className="fa-solid fa-bars text-light"></i>
                </button>

                <div class="modal fade" id="quizResultModal" tabindex="-1" aria-labelledby="quizResultModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="quizResultModalLabel">Quiz Results</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                {isAsideLoading && <div className="" style={{ textAlign: 'center' }}><Loading /> </div>}

                                <div>

                                    {results.length > 0 ? (
                                        results.map((result, i) => {

                                            const submissionTime = new Date(result.submissionTime);
                                            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                                            const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: userTimeZone };
                                            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(submissionTime);

                                            const truncatedText = `${formattedDate}`;

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

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </header>

            <aside id="result-aside" style={{ overflowY: 'auto' }}>
                <h3>Quiz Results</h3>

                <hr />

                {isAsideLoading && <div className="" style={{ textAlign: 'center' }}><Loading /> </div>}

                <div>
                    {results.length > 0 ? (
                        results.map((result, i) => {

                            const submissionTime = new Date(result.submissionTime);
                            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                            const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: userTimeZone };
                            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(submissionTime);

                            const truncatedText = `${formattedDate}`;

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
                                    <h6 className="mt-2">
                                        {combinedItem.answers.find(answer => answer.answerId === combinedItem.submittedAnswerId && !answer.isCorrect)
                                            ? `( Score: 0 / ${combinedItem.score} )`
                                            : `( Score: ${combinedItem.score} / ${combinedItem.score} )`
                                        }
                                    </h6>
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
                                                            {isAnswerCorrect ? <i className="fa-solid fa-check text-light p-1"></i> : <i className="fa-solid fa-x text-light p-1"></i>}
                                                        </span>
                                                    )}
                                                    {isAnswerCorrect && !isCheckedAnswer && (
                                                        <span className="correct-answer ms-2">
                                                            <i className="fa-solid fa-check text-light p-1"></i>
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

        </div>

    </>
}

export default QuizResult;