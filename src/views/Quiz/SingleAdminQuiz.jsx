import { useParams } from "react-router";
import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import CommentLoading from "../../components/CommentLoading";
import "./Quiz.css"

const SingleAdminQuiz = () => {
    let params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [loading, setLoading] = useState();
    const [publishloading, setPublishLoading] = useState();
    const [commentloading, setCommentLoading] = useState();
    const [postCommentLoading, setPostCommentLoading] = useState();

    const [comment, setComment] = useState();
    const [commentCount, setCommentCount] = useState();
    const [quizComments, setQuizComments] = useState([]);
    const [quiz, setQuiz] = useState({});
    const [category, setCategory] = useState([]);

    const [error, setError] = useState("");
    const [postCommentError, setPostCommentError] = useState("");
    const [success, setSuccess] = useState("");

    async function getQuiz(id) {
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

    useEffect(() => {

        getQuiz(id)
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

    async function PublishQuiz() {
        try {
            setPublishLoading(true);
            const response = await axios.post(`Quiz/publish-quiz?quizId=${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });

            console.log(response);
            if (response.status === 200) {
                setPublishLoading(false);
                setSuccess(response.data);
            }

        } catch (error) {
            console.log(error);
            setPublishLoading(false);

            setError(error.response.data);
        }
    }

    async function UnPublishQuiz() {
        try {
            setPublishLoading(true);
            const response = await axios.post(`Quiz/unpublish-quiz?quizId=${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });

            console.log(response);
            if (response.status === 200) {
                setPublishLoading(false);
                setSuccess(response.data);
            }

        } catch (error) {
            console.log(error);
            setPublishLoading(false);

            setError(error.response.data);
        }
    }

    async function getQuizComments(params) {
        try {
            setCommentLoading(true);

            const response = await axios.get(`Quiz/view-quiz-comments?quizId=${id}`, {
            });

            const { data } = response;
            if (data) {
                setCommentLoading(false);
                setQuizComments(data);
                setCommentCount(data[0].commentCount);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getQuizComments();
    }, []);


    async function postComment(params) {

        if (user == null) {
            setError("You have to be logged in");
            return
        }

        try {
            setPostCommentLoading(true);

            const response = await axios.post(`Quiz/add-quiz-comment?quizId=${id}`, { comment },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });

            if (response.status === 200) {
                setPostCommentLoading(false);
                getQuizComments();
                console.log(response);
                setSuccess(response.data);
            }

        } catch (error) {
            setPostCommentLoading(false);

            console.error(error);
            setPostCommentError(error.response.data);
        }
    }

    useEffect(() => {
        let errorTimeoutId;
        let postCommentErrorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
            }, 4000);
        }

        if (postCommentError) {
            postCommentErrorTimeoutId = setTimeout(() => {
                setPostCommentError(null);
            }, 4000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
            }, 4000);
        }

        return () => {
            clearTimeout(errorTimeoutId);
            clearTimeout(postCommentErrorTimeoutId);
            clearTimeout(successTimeoutId);
        };

    }, [error, success, postCommentError]);

    return <>
        <section className="vh-110 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-4 px-md-5 text-lg-start my-">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-12 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>



                        <div style={{ height: '1200px' }} className="card bg-glass me-auto ms-auto">
                            <div className="card-body px-4 py-5 px-md-5">

                                {loading ? <div className="mt-5" style={{ textAlign: 'center' }}><Loading /> </div> :


                                    <div style={{ height: '1100px', overflowY: 'auto' }}>

                                        <div class="vh-110 container px-1 text-center">

                                            <div className="row ">

                                                <div className="d-flex details justify-content-between">
                                                    <div className="col-md-5 ms-0">

                                                        {publishloading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}
                                                        {error && <div className="alert alert-danger text-center">{error}</div>}
                                                        {success && <div className="alert alert-success text-center">{success}</div>}

                                                        <div className="d-flex justify-content-between">
                                                            <Link to={`/admin-quizzes`}>
                                                                <button className="btn btn-danger"><i class="fa-solid fa-arrow-left text-light"></i></button>
                                                            </Link>
                                                            {quiz.isPublished ?
                                                                <button onClick={UnPublishQuiz} className="btn btn-danger mb-3">
                                                                    Unpublish
                                                                </button>
                                                                :
                                                                <button onClick={PublishQuiz} className="btn btn-success mb-3">
                                                                    Publish
                                                                </button>
                                                            }
                                                            <Link to={`/view-admin-questions-in-quiz/${id}`}><button className="btn btn-dark mb-3"><i className="fa-solid fa-gear text-light"></i></button></Link>
                                                        </div>
                                                        <div className="quiz-picture">
                                                            <img src={quiz.imageUrl || require('./images/QuizDefault.jpg')} className="quiz-picture" alt="Default Quiz" />
                                                        </div>
                                                    </div>

                                                    <div className="text-center col-md-7 fs-5">
                                                        <h3 className="">{quiz.quizName}</h3>
                                                        <hr />
                                                        <div>
                                                            <div>
                                                                <p className="fs-4 mb-0">Categories:</p>
                                                                {category.length > 0 ? (
                                                                    category.map((item, index) => (
                                                                        <div key={index}>{item}</div>
                                                                    ))
                                                                ) : (
                                                                    <div>No categories</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <p className="text-left"><span>Description</span> : {quiz.quizDescription}</p>
                                                        <hr />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-left ms-2">
                                                <div className="mt-5 mb-0">
                                                    {postCommentError && <div className="alert alert-danger text-center">{postCommentError}</div>}
                                                    {success && <div className="alert alert-success text-center">{success}</div>}
                                                    {postCommentLoading && <div className="mb-3" style={{ textAlign: 'center' }}><CommentLoading /> </div>}
                                                </div>

                                                <div className="d-flex justify-content-between mt-5 mb-3">
                                                    <h3 style={{ letterSpacing: '1px' }} className="">COMMENTS ({commentCount || '0'})</h3>

                                                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#commmentModal">
                                                        <i class="fa-solid fa-plus text-light"></i>

                                                    </button>
                                                </div>


                                                <hr />

                                                {commentloading ? <div className="mt-5" style={{ textAlign: 'center' }}><Loading /> </div> :

                                                    <div style={{ height: '600px', overflowY: 'auto' }}>

                                                        {quizComments.length > 0 ? (
                                                            quizComments.map((comment) => {

                                                                const submissionTime = new Date(comment.dateCreated);
                                                                const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                                                                const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: userTimeZone };
                                                                const formattedDate = new Intl.DateTimeFormat('en-US', options).format(submissionTime);

                                                                const truncatedText = `${formattedDate}`;

                                                                return (
                                                                    <div>

                                                                        <div className="d-flex">
                                                                            <img src={comment.imageUrl || require('./images/user.png')} className="comment-image" alt="Default Quiz" />

                                                                            <div className="text-left fs- d-flex flex-column">
                                                                                <h5 className="mt-auto text-primary ">{comment.username}</h5>
                                                                                <p className="mb-auto text-primary">{truncatedText}</p>
                                                                            </div>
                                                                        </div>

                                                                        <div className="mt-3 mb-3 fs-5">
                                                                            {comment.comment}
                                                                        </div>

                                                                    </div>

                                                                );
                                                            })
                                                        ) : (
                                                            <h3 className="text-center mt-3">No Comments</h3>

                                                        )}


                                                    </div>
                                                }

                                            </div>

                                        </div>

                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        <div class="modal fade" id="commmentModal" tabindex="-1" aria-labelledby="commmentModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="commmentModalLabel">Post Comment</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <form className="form" action="">
                            <div className="mb-4 form-group">
                                <label className="form-label">Comment</label>
                                <textarea
                                    type="text"
                                    rows={4}
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </form>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={postComment}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SingleAdminQuiz;