import axios from "../../axios/axios";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import "./Quiz.css"

const CreateQuiz = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [isLoading, setIsLoading] = useState();
    const [quizName, setQuizName] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [categories, setCategories] = useState([]);

    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInput = useRef(null);

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    let quizId;

    async function submitHandler(e) {
        e.preventDefault();

        const formData = new FormData();
        if (profileImage) {
            formData.append("profileImage", profileImage);
        }

        setError(false);
        setSuccess(false);

        try {
            setIsLoading(true);

            const quizResponse = await axios.post(`Quiz/add-quiz`, { quizName, quizDescription },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
            );

            if (quizResponse.status === 200) {
                quizId = quizResponse.data.quizId;
                console.log(quizResponse);
                setSuccess(quizResponse.data.message);


                // Step 2: Associate Categories with Quiz
                const categoryResponse = await axios.post(`Quiz/add-category-to-quiz/${quizId}`, {                    
                    categoryIds: selectedOptions
                }, {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                });

                if (categoryResponse.status === 200) {                    
                    setIsLoading(false);
                    setSuccess(categoryResponse.data);
                }
            }
        }

        catch (error) {
            setIsLoading(false);

            if (error.quizResponse.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                setIsLoading(false);

                console.error(error.quizResponse);
                setError(error.quizResponse.data);
            }
        }

        if (profileImage && quizId) {
            try {
                setIsLoading(true);

                const quizPicResponse = await axios.post(`Quiz/upload-quiz-picture?quizId=${quizId}`, formData,
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        },
                    },
                );

                if (quizPicResponse.status === 200) {
                    setIsLoading(false);

                    console.log(quizPicResponse);
                    setSuccess(quizPicResponse.data.message);
                    // setError('');
                }
            }

            catch (error) {
                setIsLoading(false);

                if (error.quizPicResponse.status === 401) {
                    window.alert('Your session has expired. Login again!');
                    localStorage.removeItem('userDetails');

                    navigate('/login');
                } else {
                    setIsLoading(false);

                    console.error(error.quizPicResponse);
                    setError(error.quizPicResponse.data);
                }
            }
        }
    }

    const handleSelectChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(selected.slice(0, 3)); // Limit to 3 selections
    }

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

    return <>
        <section className="vh-110 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-4 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-12 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="bg-glass">
                            <div className="px-4 py-5 px-md-5">

                                <ul className="nav nav-tabs d-flex justify-content-between p-3" id="myTab" role="tablist">

                                    <Link to="/create-quiz">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="names-tab" data-bs-toggle="tab" data-bs-target="#names-tab-pane" type="button" role="tab" aria-controls="names-tab-pane" aria-selected="true"> Create </p>
                                        </li>
                                    </Link>

                                    <Link to="/admin-quizzes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="email-tab" data-bs-toggle="tab" data-bs-target="#email-tab-pane" type="button" role="tab" aria-controls="email-tab-pane" aria-selected="false"> Admin Quizzes </p>
                                        </li>
                                    </Link>

                                    <Link to="/admin-published-quizzes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" type="button" role="tab" aria-controls="password-tab-pane" aria-selected="false">Published </p>
                                        </li>
                                    </Link>

                                    <Link to="/admin-unpublished-quizzes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="unpublished-tab" data-bs-toggle="tab" data-bs-target="#unpublished-tab-pane" type="button" role="tab" aria-controls="unpublished-tab-pane" aria-selected="false">Unpublished</p>
                                        </li>
                                    </Link>

                                </ul >

                                <div className="card col-lg- ms-auto me-auto bg-glass">

                                    {isLoading && <div className="mt-5" style={{ textAlign: 'center' }}><Loading /> </div>}
                                    {error && (
                                        <div className="mt-5 alert alert-danger">
                                            {typeof error === "object" ? (
                                                Object.values(error).map((messages, index) => (
                                                    <ul key={index}>
                                                        {messages.map((message, i) => (
                                                            <li key={i}>{message}</li>
                                                        )
                                                        )}
                                                    </ul>
                                                ))
                                            ) : (
                                                <div className="text-center">{error}</div>
                                            )}
                                        </div>
                                    )}
                                    {success && <div className="mt-5 me-4 ms-4 alert alert-success text-center">{success}</div>}


                                    <div className="card-body px-4 py-5 px-md-5 d-flex create-quiz">


                                        <form className="form col-md-5 create-form" onSubmit={submitHandler}>
                                            <h4 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Create Quiz</h4>

                                            <div className="">

                                                <div className="mb-4 form-group">
                                                    <label className="form-label">Name</label>
                                                    <input
                                                        type="text"
                                                        value={quizName}
                                                        onChange={e => setQuizName(e.target.value)}
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="mb-4 form-group">
                                                    <label className="form-label">Description</label>
                                                    <textarea
                                                        type="text"
                                                        rows={5}
                                                        value={quizDescription}
                                                        onChange={e => setQuizDescription(e.target.value)}
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlSelect2">Categories (You can only select 3) <br /> (Hold Ctrl to select on PC)</label>
                                                    <select
                                                        multiple
                                                        className="form-control"
                                                        id="exampleFormControlSelect2"
                                                        onChange={handleSelectChange}
                                                        value={selectedOptions}
                                                    >
                                                        {categories.length > 0 && categories.map(category => {
                                                            return <option key={category.categoryId} value={category.categoryId}> {category.categoryName} </option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="text-center">

                                                <button type="submit" className="edit-button btn btn-dark ms-auto me-auto">
                                                    Create
                                                </button>
                                            </div>

                                        </form>

                                        <form className="form" onSubmit={submitHandler}>
                                            <h4 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Upload Picture</h4>

                                            <div className="">

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
                                                        {
                                                            <img
                                                                className="ms-auto me-auto mb-4 mt-2"
                                                                src={preview || require("./QuizUploadDefault.jpg")}
                                                                alt="Preview"
                                                                style={{ width: "80%", height: "45%", borderRadius: "10px" }}
                                                                onClick={() => fileInput.current.click()}
                                                            />
                                                        }
                                                        <div className="text-center">
                                                            <button type="button" className="btn btn-dark w-" onClick={() => fileInput.current.click()}>
                                                                Choose a picture
                                                            </button>                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>

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

export default CreateQuiz;