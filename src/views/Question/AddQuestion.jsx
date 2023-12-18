import "./Question.css"
import axios from "../../axios/axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import RenderHtmlComponent from "../../components/RenderHtmlComponent";

const AddQuestion = () => {
    const navigate = useNavigate();

    // New state to store answers for each question
    const [questionAnswers, setQuestionAnswers] = useState({});

    const [quizquestions, setQuizQuestions] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [quizId, setQuizId] = useState("");

    const [questionDetails, setQuestionDetails] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState("");

    const [questionText, setQuestionText] = useState("");
    const [questionTypes, setQuestionTypes] = useState([]);
    const [questionTypeId, setQuestionTypeId] = useState("");
    const [existingQuestionPicture, setExistingQuestionPicture] = useState(null);

    const [profileImage, setProfileImage] = useState();
    const [preview, setPreview] = useState(null);
    const fileInput = useRef(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isMainLoading, setIsMainLoading] = useState(false);
    const [isArticleLoading, setIsArticleLoading] = useState(false);

    var toolbarOptions = [
        ['bold', 'italic', 'underline', { 'color': [] }],

        ['code-block', { 'script': 'sub' }, { 'script': 'super' }, { 'list': 'bullet' }],

        ['clean']
    ];

    const modules = {
        toolbar: toolbarOptions
    };

    const user = JSON.parse(localStorage.getItem("userDetails"));

    const formData = new FormData();
    if (profileImage) {
        formData.append("profileImage", profileImage);
    };
    const savedAnswers = JSON.parse(localStorage.getItem('questionAnswers'));

    // Get all unpublished questions from all quizzes
    async function getQuizQuestions() {        
        try {
            setIsArticleLoading(true);

            const response = await axios.get(`Question/get-unpublished-questions-in-quiz`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });

            const { data } = response;
            if (response.status === 200) {
                setIsArticleLoading(false);
                setQuizQuestions(data);
            }

        } catch (error) {
            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                setIsArticleLoading(false);

                console.error(error.response);
            }
        }
    }

    useEffect(() => {

        getQuizQuestions();
    }, [user.accessToken, navigate]);

    // Get all question types
    async function getQuestionTypes() {
        try {
            const response = await axios.get(`QuestionType/get-all-questionTypes`, {

                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }

            });

            const { data } = response;
            if (data) {
                setQuestionTypes(data);
            }

        } catch (error) {
            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                console.error(error.response);
            }
        }
    };


    // Get all quizzes
    async function getQuizzes() {
        try {

            const response = await axios.get(`Quiz/get-all-admin-quizzes`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }

            });

            const { data } = response;
            if (data) {
                setQuizzes(data);
            }

        } catch (error) {
            console.error(error)
        }

    };


    // Add questions to the quiz
    async function AddQuestionsToQuiz() {
        try {

            if (questionText == "" || questionTypeId == "" || quizId == "") {
                setError("Fill in all the fields");
                return;
            }
            setIsArticleLoading(true);

            const response = await axios.post(`Question/add-questions-to-quiz`,
                { questionText, questionTypeId, quizId },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            if (response.status === 200) {
                setIsArticleLoading(false);
                console.log(response.data);
                setSuccess(response.data);
                getQuizQuestions();
            }
        } catch (error) {
            setIsArticleLoading(false);

            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                setIsArticleLoading(false);

                console.error(error.response);
            }
        }
    };


    // get individual question details
    async function getQuestion(questionId) {
        try {
            const response = await axios.get(`Question/get-single-question?questionId=${questionId}`,
                {

                });

            if (response.status === 200) {
                const questionResponse = response.data;
                setExistingQuestionPicture(questionResponse.imageUrl);
            }

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


    // To show the details of the question on the main section
    async function ShowDetails(questionId) {
        try {
            const response = await axios.get(`Question/get-single-question?questionId=${questionId}`,
                {

                });

            if (response.status === 200) {
                // console.log(response.data);
                const questionResponse = response.data;
                setQuestionDetails(questionResponse);
                setSelectedQuestionId(questionId);                
            }

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


    // Delete the preview of the question Picture
    async function DeletePreview(params) {
        setPreview(null);
    };        
    

    useEffect(() => {
        let errorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
            }, 10000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
                setQuestionText("");
            }, 2000);
        }

        return () => {
            clearTimeout(errorTimeoutId);
            clearTimeout(successTimeoutId);
        };

    }, [error, success]);


    useEffect(() => {
        if (savedAnswers) {
            setQuestionAnswers(savedAnswers);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('questionAnswers', JSON.stringify(questionAnswers));
    }, [questionAnswers]);

    // Function to handle answer change for a specific question
    const handleAnswerChange = (selectedQuestionId, index, value) => {
        const updatedAnswers = { ...questionAnswers };
        if (!updatedAnswers[selectedQuestionId]) {
            updatedAnswers[selectedQuestionId] = [];
        }
        updatedAnswers[selectedQuestionId][index] = value;
        setQuestionAnswers(updatedAnswers);
    };


    // Function to add answers to the backend for a specific question
    const handleAddAnswers = async (selectedQuestionId) => {        

        if (questionAnswers.length !== questionDetails.numberOfOptions) {
            setError("Fill in all the answer boxes");
            return;
        }

        try {
            setIsMainLoading(true);

            const response = await axios.post(
                `Answer/add-multiple-answers-to-single-question?questionId=${selectedQuestionId}`,
                {
                    answerText: questionAnswers[selectedQuestionId]
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                console.log(response.data);
                setSuccess(response.data);
                // Add code to publish the question  
                if (profileImage) {
                    AddQuestionPicture(selectedQuestionId);
                }
                PublishQuestion(selectedQuestionId);

            }

        } catch (error) {
            setIsMainLoading(false);

            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                if (profileImage) {
                    AddQuestionPicture(selectedQuestionId);
                }
                PublishQuestion(selectedQuestionId);
                // setIsMainLoading(false);

                console.error(error.response);
                setError("Error adding answers.");
            }
        }
    };


    // Add Question picture
    const AddQuestionPicture = async (selectedQuestionId) => {
        getQuestion(selectedQuestionId);

        if (profileImage && existingQuestionPicture !== null) {
            try {

                const questionPicResponse = await axios.post(`Question/upload-question-picture?questionId=${selectedQuestionId}`, formData,
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        },
                    },
                );

                if (questionPicResponse.status === 200) {

                    console.log(questionPicResponse.data.message);

                    // setSuccess(questionPicResponse.data.message);
                    // setError('');
                }

            }

            catch (error) {
                setIsMainLoading(false);

                if (error.response.status === 401) {
                    window.alert('Your session has expired. Login again!');
                    localStorage.removeItem('userDetails');

                    navigate('/login');
                } else {
                    setIsMainLoading(false);

                    console.error(error.response);
                    setError(error.response.data);
                }
            }
        }
    };


    // Publish the question
    const PublishQuestion = async (selectedQuestionId) => {
        try {

            const response = await axios.post(
                `Question/publish-question?questionId=${selectedQuestionId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                setIsMainLoading(false);
                console.log(response.data);
                window.location.reload();

                // Add code to handle successful question publishing
            }

        } catch (error) {
            setIsMainLoading(false);

            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                setIsMainLoading(false);

                console.error(error.response);
                setError("Error publishing question.");
            }
        }
    };


    // Function to render answer textboxes for a specific question
    const renderAnswerTextboxes = () => {
        const answerTextboxes = [];
        for (let i = 0; i < questionDetails.numberOfOptions; i++) {
            answerTextboxes.push(
                <div key={i} className="mb-3">
                    <ReactQuill
                        modules={modules}
                        theme="snow"
                        placeholder={`Answer ${i + 1}`}
                        value={questionAnswers[selectedQuestionId]?.[i] || ''}
                        onChange={(value) => handleAnswerChange(selectedQuestionId, i, value)}
                        required
                    />
                </div>
            );
        }
        return answerTextboxes;
    };


    async function DeleteQuestion(questionId) {
        try {
            const deleteResponse = await axios.delete(`Question/delete-question?questionId=${questionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
            );

            if (deleteResponse.status === 200) {

                console.log(deleteResponse);
                getQuizQuestions();

                if (selectedQuestionId == questionId) {
                    setSelectedQuestionId("");
                }
                // setError('');
            }
        } catch (error) {

        }
    };

    async function GetQuestCatsQuiz(params) {
        getQuestionTypes();
        getQuizzes();
    }


    return <>
        <div id="page-content">

            <header id="question-header" className="">

                <div className="text-center mt-3 question-header">
                    Quiz : {questionDetails.quizName == null ? 'NIL' : questionDetails.quizName}
                </div>

            </header>

            <main>

                <div className={`container py-5 h-100 ${questionDetails.length == 0 ? 'display-if-question-selected' : ''}`}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-11">
                            <div className="card" style={{ borderRadius: '1rem' }}>
                                <div className="d-flex justify-content-between col-lg-12 main-question-details">

                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            {isMainLoading && <div className="" style={{ textAlign: 'center' }}><Loading /> </div>}
                                            {error && <div className=" alert alert-danger text-center">{error}</div>}

                                            <div className="">
                                                {
                                                    <RenderHtmlComponent htmlContent={questionDetails.questionText} />
                                                }
                                            </div>

                                            <div className="">
                                                <p>(The first answer is the correct one)</p>
                                            </div>

                                            <form onSubmit={() => handleAddAnswers(selectedQuestionId)}>
                                                {renderAnswerTextboxes()}

                                                <button type="submit" className="btn btn-success">Add</button>
                                            </form>

                                            <div className={`${questionDetails == [] ? 'text-light' : ''}`}>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-5 col-lg-4 mt-auto mb-auto ms-auto me-auto ">

                                        <div>
                                            <input
                                                type="file"
                                                onChange={(e) => {
                                                    setProfileImage(e.target.files[0]);
                                                    setPreview(URL.createObjectURL(e.target.files[0]));
                                                }}
                                                style={{ display: "none" }}
                                                ref={fileInput}
                                            />
                                            <div className="" style={{ display: "flex", textAlign: "center" }}>
                                                {questionDetails.imageUrl ? (
                                                    <img
                                                        className="ms-auto me-auto mb-2 mt-2 question-pic"
                                                        src={preview || questionDetails.imageUrl}
                                                        alt="Profile"
                                                        style={{ width: "350px", height: "175px", borderRadius: "10px" }}
                                                    // onClick={() => fileInput.current.click()}
                                                    />
                                                ) : (
                                                    <img
                                                        className="ms-auto me-auto mb-2 mt-1 question-pic"
                                                        src={preview || require("./QuizUploadDefault.jpg")}
                                                        alt="Preview"
                                                        style={{ width: "350px", height: "175px", borderRadius: "10px" }}
                                                    // onClick={() => fileInput.current.click()}
                                                    />
                                                )}

                                            </div>
                                        </div>

                                        <div className="text-center d-flex justify-content-around mb-2 ms-auto me-auto">
                                            <div>
                                                <button type="button" className="btn btn-dark" onClick={() => fileInput.current.click()}>
                                                    <i class="fa-solid fa-image text-light"></i>
                                                </button>
                                            </div>
                                            <div>
                                                <button type="button" className="btn btn-danger" onClick={() => DeletePreview()}>
                                                    <i class="fa-solid fa-trash text-light"></i>
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${questionDetails.length == 0 ? '' : 'display-if-question-selected'}`}>
                    <div className={`centered-container`}>
                        <div className="mb-auto mt-auto me-auto ms-auto centered-content fs-5">
                            <p>
                                Select a question to proceed
                            </p>
                        </div>
                    </div>
                </div>

            </main>


            <article >
                <div className="d-flex justify-content-between">
                    <div className="mt-auto mb-auto">
                        Questions in Quiz
                    </div>
                    <div>
                        <button onClick={GetQuestCatsQuiz} type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#QuestionQuizModal" title="Add Question">
                            <i class="fa-solid fa-plus text-light"></i>
                        </button>

                        <div class="modal fade" id="QuestionQuizModal" tabindex="-1" aria-labelledby="QuestionQuizModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="QuestionQuizModalLabel">Add Question to Quiz</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                        {isArticleLoading && <div className="" style={{ textAlign: 'center' }}><Loading /> </div>}
                                        {error && <div className=" me-4 ms-4 alert alert-danger text-center">{error}</div>}
                                        {success && <div className=" me-4 ms-4 alert alert-success text-center">{success}</div>}

                                        <form>
                                            <div className="mb-4 me-4 ms-4">
                                                <label className="form-label">Question Text</label>
                                                {
                                                    <ReactQuill
                                                        modules={modules}
                                                        theme="snow"
                                                        value={questionText}
                                                        onChange={setQuestionText}
                                                    />
                                                }
                                            </div>

                                            <div className="mb-4 me-4 ms-4">
                                                <label className="form-label" htmlfor="halls">Question Type</label>
                                                <select value={questionTypeId} onChange={e => setQuestionTypeId(e.target.value)} required className="form-control form-select">
                                                    <option hidden value="">--- Select Question Type ---</option>

                                                    {questionTypes.length > 0 && questionTypes.map(questionType => {
                                                        return <option key={questionType.questionTypeId} value={questionType.questionTypeId}> {questionType.typeName} </option>
                                                    })}
                                                </select>
                                            </div>

                                            <div className="mb-4 me-4 ms-4">
                                                <label className="form-label" htmlfor="halls">Quiz</label>
                                                <select value={quizId} onChange={e => setQuizId(e.target.value)} required className="form-control form-select">
                                                    <option hidden value="">--- Select Quiz ---</option>

                                                    {quizzes.length > 0 && quizzes.map(quiz => {
                                                        return <option key={quiz.quizId} value={quiz.quizId}> {quiz.quizName} </option>
                                                    })}
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        <button onClick={AddQuestionsToQuiz} type="button" class="btn btn-success">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                {isArticleLoading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}

                <div className="question-list" style={{ overflowY: 'auto' }}>
                    {quizquestions.length > 0 ? (
                        quizquestions.map((question, i) => {

                            let renderedText = <RenderHtmlComponent htmlContent={question.questionText} />
                            const truncatedText = renderedText.length > 30 ? renderedText.slice(0, 30) + '...' : renderedText;
                            // const truncatedText = question.questionText.length > 30 ? question.questionText.slice(0, 30) + '...' : question.questionText;

                            return (
                                <div onClick={() => ShowDetails(question.questionId)} className={`unpublished-questions p-2 d-flex justify-content-between ${selectedQuestionId === question.questionId ? 'selected-question' : ''}`} key={question.questionId}>
                                    <div onClick={() => ShowDetails(question.questionId)} className="question-text me-0">
                                        <button disabled className="btn btn-dark mb-1">Q{i + 1}</button>
                                        <div className={`question-text ${selectedQuestionId === question.questionId ? 'text-light' : ''}`}>
                                            {truncatedText}
                                        </div>
                                    </div>
                                    <div className="mt-auto mb-auto">
                                        <i onClick={() => DeleteQuestion(question.questionId)} className={`fa-solid fa-trash ms-0 me-2 ${selectedQuestionId === question.questionId ? 'text-light' : ''}`}></i>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center mt-3">No questions</div>
                    )}

                </div>
            </article>

        </div>
    </>
}

export default AddQuestion;