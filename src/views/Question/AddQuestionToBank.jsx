import "./Question.css"
import axios from "../../axios/axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const AddQuestionToBank = () => {
    const navigate = useNavigate();

    // New state to store answers for each question
    const [questionAnswers, setQuestionAnswers] = useState({});

    const [questions, setQuestions] = useState([]);

    const [questionDetails, setQuestionDetails] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState("");

    const [questionText, setQuestionText] = useState("");
    const [questionTypes, setQuestionTypes] = useState([]);
    const [questionTypeId, setQuestionTypeId] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInput = useRef(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("userDetails"));

    const formData = new FormData();
    if (profileImage) {
        formData.append("profileImage", profileImage);
    }
    const savedAnswers = JSON.parse(localStorage.getItem('questionAnswers'));

    useEffect(() => {
        async function getQuestions() {
            try {
                setIsLoading(true);

                const response = await axios.get(`Question/get-unpublished-questions`, {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

                const { data } = response;
                if (response.status === 200) {
                    setIsLoading(false);
                    setQuestions(data);
                }

            } catch (error) {
                if (error.response.status === 401) {
                    window.alert('Your session has expired. Login again!');
                    localStorage.removeItem('userDetails');

                    navigate('/login');
                } else {
                    setIsLoading(false);

                    console.error(error.response);
                }
            }
        }

        getQuestions()
    }, [user.accessToken, navigate]);

    useEffect(() => {
        async function getQuestionType() {
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
                    setIsLoading(false);

                    console.error(error.response);
                }
            }
        }

        getQuestionType()
    });

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await axios.get(`Category/get-all-categories`, {

                });

                const { data } = response;
                if (data) {
                    setCategories(data);
                }

            } catch (error) {
                console.error(error);
            }
        }

        getCategories()
    });

    async function AddQuestion() {

        try {
            setIsLoading(true);

            const response = await axios.post(`Question/add-question-to-bank`,
                { questionText, questionTypeId, categoryId },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            if (response.status === 200) {
                setIsLoading(false);
                console.log(response.data);
                setSuccess(response.data);
            }
        } catch (error) {
            setIsLoading(false);

            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                setIsLoading(false);

                console.error(error.response);
                setError("Fill out all the fields");
            }
        }
    };

    async function ShowDetails(questionId) {
        try {
            const response = await axios.get(`Question/get-single-question?questionId=${questionId}`,
                {

                });

            if (response.status === 200) {
                clearQuestionDetails();
                console.log(response.data);
                const questionResponse = response.data;
                setQuestionDetails(questionResponse);
                setSelectedQuestionId(questionId);

                // Save details to local storage
                localStorage.setItem('questionDetails', JSON.stringify(questionResponse));

                // Set the selected question ID
                localStorage.setItem('selectedQuestionId', questionId);
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

    async function DeletePreview(params) {
        setPreview(null);
    }

    useEffect(() => {
        const savedQuestionDetails = JSON.parse(localStorage.getItem('questionDetails'));
        const savedSelectedQuestionId = localStorage.getItem('selectedQuestionId');



        if (savedQuestionDetails) {
            setQuestionDetails(savedQuestionDetails);
        }

        if (savedSelectedQuestionId === questionDetails.questionId) {
            // Apply background color
            setSelectedQuestionId(questionDetails.questionId);
        }
    }, [questionDetails.questionId]);

    function clearQuestionDetails() {
        localStorage.removeItem('questionDetails');
        localStorage.removeItem('selectedQuestionId');
    }

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
                setQuestionText("");
                setCategoryId("");
                setQuestionTypeId("");
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
        try {
            setIsLoading(true);

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
                    try {

                        const questionPicResponse = await axios.post(`Question/upload-question-picture?questionId=${selectedQuestionId}`, formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${user.accessToken}`
                                },
                            },
                        );

                        if (questionPicResponse.status === 200) {

                            console.log(questionPicResponse);
                            setSuccess(questionPicResponse.data.message);
                            // setError('');
                        }
                    }

                    catch (error) {
                        setIsLoading(false);

                        if (error.questionPicResponse.status === 401) {
                            window.alert('Your session has expired. Login again!');
                            localStorage.removeItem('userDetails');

                            navigate('/login');
                        } else {
                            setIsLoading(false);

                            console.error(error.questionPicResponse);
                            setError(error.questionPicResponse.data);
                        }
                    }
                }

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
                        setIsLoading(false);
                        console.log(response.data);
                        clearQuestionDetails();
                        window.location.reload();
                        // Add code to handle successful question publishing
                    }

                } catch (error) {
                    setIsLoading(false);

                    if (error.response.status === 401) {
                        window.alert('Your session has expired. Login again!');
                        localStorage.removeItem('userDetails');

                        navigate('/login');
                    } else {
                        setIsLoading(false);

                        console.error(error.response);
                        setError("Error publishing question.");
                    }
                }
            }

        } catch (error) {
            setIsLoading(false);

            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                setIsLoading(false);

                console.error(error.response);
                setError("Error adding answers.");
            }
        }
    };


    // Function to render answer textboxes for a specific question
    const renderAnswerTextboxes = (selectedQuestionId, numberOfOptions) => {
        const answerTextboxes = [];
        for (let i = 0; i < numberOfOptions; i++) {
            answerTextboxes.push(
                <div key={i} className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={`Answer ${i + 1}`}
                        value={questionAnswers[selectedQuestionId]?.[i] || ''}
                        onChange={(e) => handleAnswerChange(selectedQuestionId, i, e.target.value)}
                        required
                    />
                </div>
            );
        }
        return answerTextboxes;
    };


    async function DeleteQuestion(questionId) {
        try {
            const deleteResponse = await axios.delete(`Question/delete-unpublished-questions?questionId=${questionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
            );

            if (deleteResponse.status === 200) {

                console.log(deleteResponse);
                // setError('');
            }
        } catch (error) {

        }
    }

    return <>
        <div id="page-content">

            <header className="d-flex justify-content-between">
                <div className="mt-auto mb-auto">
                    Question Bank
                </div>
                <div className="d-flex">
                    <p className="mt-auto mb-auto me-4">Create</p>
                    <p className="mt-auto mb-auto">View</p>
                </div>
                <div>
                    <button className="btn btn-dark">
                        Publish
                    </button>
                </div>
            </header>

            <main>

                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: '1rem' }}>
                                <div className="row g-0">


                                    <div className="col-md-6 col-lg-6 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            {isLoading && <div className="" style={{ textAlign: 'center' }}><Loading /> </div>}

                                            <div className="">
                                                {questionDetails.questionText}
                                            </div>

                                            <div>
                                                <p>(The first answer is the correct one)</p>
                                            </div>

                                            <form onSubmit={() => handleAddAnswers(selectedQuestionId)}>
                                                {renderAnswerTextboxes(selectedQuestionId, questionDetails.numberOfOptions)}

                                                <button type="submit" className="btn btn-success">Add</button>
                                            </form>


                                        </div>
                                    </div>

                                    <div className="col-md-5 col-lg-5 d-none d-md-block">
                                        <div className="">
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
                                                        className="ms-auto me-auto mb-2 mt-2"
                                                        src={preview || questionDetails.imageUrl}
                                                        alt="Profile"
                                                        style={{ width: "369px", height: "350px", borderRadius: "10px" }}
                                                    // onClick={() => fileInput.current.click()}
                                                    />
                                                ) : (
                                                    <img
                                                        className="ms-auto me-auto mb-2 mt-1"
                                                        src={preview || require("./QuizUploadDefault.jpg")}
                                                        alt="Preview"
                                                        style={{ width: "369px", height: "350px", borderRadius: "10px" }}
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
            </main>

            <aside>
                <div className="d-flex justify-content-between">
                    <div className="mt-auto mb-auto">
                        Questions
                    </div>
                    <div>
                        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#QuestionModal" title="Add Question">
                            <i class="fa-solid fa-plus text-light"></i>
                        </button>

                        <div class="modal fade" id="QuestionModal" tabindex="-1" aria-labelledby="QuestionModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="QuestionModalLabel">Add Question</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                        {isLoading && <div className="" style={{ textAlign: 'center' }}><Loading /> </div>}
                                        {error && <div className=" me-4 ms-4 alert alert-danger text-center">{error}</div>}
                                        {success && <div className=" me-4 ms-4 alert alert-success text-center">{success}</div>}

                                        <form>
                                            <div class="mb-3 me-4 ms-4">
                                                <label for="recipient-name" class="col-form-label">Question Text:</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="recipient-name"
                                                    value={questionText}
                                                    onChange={e => setQuestionText(e.target.value)}
                                                    required
                                                />
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
                                                <label className="form-label" htmlfor="halls">Category</label>
                                                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required className="form-control form-select">
                                                    <option hidden value="">--- Select Category ---</option>

                                                    {categories.length > 0 && categories.map(category => {
                                                        return <option key={category.categoryId} value={category.categoryId}> {category.categoryName} </option>
                                                    })}
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        <button onClick={AddQuestion} type="button" class="btn btn-success">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}

                <div style={{ overflowY: 'auto' }}>
                    {questions && questions.map((question, i) => {
                        const truncatedText = question.questionText.length > 15 ? question.questionText.slice(0, 15) + '...' : question.questionText;

                        return <div className={`unpublished-questions p-2 d-flex justify-content-between ${selectedQuestionId === question.questionId ? 'selected-question' : ''}`} key={question.questionId}>
                            <div onClick={() => ShowDetails(question.questionId)} className="question-text me-0">
                                <button disabled className="btn btn-dark">Q{i + 1}</button> <span className={`mt-auto mb-auto question-text ${selectedQuestionId === question.questionId ? 'text-light' : ''}`}>{truncatedText}</span>
                            </div>
                            <div className="mt-auto mb-auto">
                                <i onClick={() => DeleteQuestion(question.questionId)} class={`fa-solid fa-trash ms-0 me-2 ${selectedQuestionId === question.questionId ? 'text-light' : ''}`}></i>
                            </div>
                        </div>
                    })}
                </div>
            </aside>

            <section>

                <div>
                    Details
                </div>
                <hr />

                <div className="mb-2">
                    Question Type :
                </div>
                <div className="text-center">
                    {questionDetails.questionTypeName}
                </div>

                <hr />

                <div className="mb-2">
                    Category :
                </div>
                <div className="text-center">
                    {questionDetails.categoryName}
                </div>

            </section>

        </div>
    </>
}

export default AddQuestionToBank;