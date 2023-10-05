import "./Question.css"
import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const AddQuestionToBank = () => {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);

    const [questionDetails, setQuestionDetails] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState("");
    

    const [questionText, setQuestionText] = useState("");
    const [questionTypes, setQuestionTypes] = useState([]);
    const [questionTypeId, setQuestionTypeId] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    // const [preview, setPreview] = useState(null);
    // const fileInput = useRef(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("userDetails"));
    

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
        } else {
            // Remove background color

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
                {/* <div className="d-flex justify-content-around">

                    <div className="">
                        {questionDetails.questionText}
                    </div>

                    <div className="mb-4">
                        <input
                            type="file"
                            onChange={(e) => {
                                setProfileImage(e.target.files[0]);
                                setPreview(URL.createObjectURL(e.target.files[0]));
                            }}
                            style={{ display: "none" }}
                            ref={fileInput}
                        />
                        <div className="picture-preview" style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                            {questionDetails.imageUrl ? (
                                <img
                                    className="ms-auto me-auto mb-4 mt-2"
                                    src={preview || questionDetails.imageUrl}
                                    alt="Profile"
                                    style={{ width: "80%", height: "45%", borderRadius: "10px" }}
                                    onClick={() => fileInput.current.click()}
                                />
                            ) : (
                                <img
                                    className="ms-auto me-auto mb-4 mt-2"
                                    src={preview || require("./QuizUploadDefault.jpg")}
                                    alt="Preview"
                                    style={{ width: "80%", height: "45%", borderRadius: "10px" }}
                                    onClick={() => fileInput.current.click()}
                                />
                            )}
                            <div className="text-center">
                                <button type="button" className="btn btn-dark w-" onClick={() => fileInput.current.click()}>
                                    Choose a picture
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: '1rem' }}>
                                <div className="row g-0">


                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <form className="form">

                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                    <span className="h1 fw-bold mb-0">Dreamchasers</span>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                                                {error && <div className="alert alert-danger">{error}</div>}


                                                <div className="">
                                                    <a className="small text-muted" href="#!">Forgot password?</a>
                                                    <p className="mb-4 pb-lg-2">Don't have an account? <a href="/register"
                                                        style={{ color: '#393f81' }}>Register here</a></p>
                                                    <a href="/about" className="small text-muted">Terms of use</a><br />
                                                    <a href="/privacy" className="small text-muted">Privacy policy</a>
                                                </div>

                                            </form>

                                        </div>
                                    </div>

                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form" className="img-fluid h-100" style={{ borderRadius: '0 1rem 1rem 0' }} />
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
                                <i class={`fa-solid fa-trash ms-0 me-2 ${selectedQuestionId === question.questionId ? 'text-light' : ''}`}></i>
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