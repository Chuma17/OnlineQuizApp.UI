import { useParams } from "react-router";
import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import "./Quiz.css"

const SingleAdminQuiz = () => {
    let params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [loading, setLoading] = useState();
    const [publishloading, setPublishLoading] = useState();
    const [quiz, setQuiz] = useState({});
    const [category, setCategory] = useState([]);

    const [error, setError] = useState("");
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


    useEffect(() => {
        let errorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
            }, 4000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
                getQuiz(id);            
            }, 2000);
        }

        return () => {
            clearTimeout(errorTimeoutId);
            clearTimeout(successTimeoutId);
        };

    }, [error, success]);
    return <>
        <section className="vh-110 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-4 px-md-5 text-lg-start my-">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-12 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>



                        <div style={{ height: '800px' }} className="card bg-glass me-auto ms-auto">
                            <div className="card-body px-4 py-5 px-md-5">

                                {loading ? <div className="mt-5" style={{ textAlign: 'center' }}><Loading /> </div> :


                                    <div style={{ height: '730px', overflowY: 'auto' }}>

                                        <div class="vh-110 container px-1 text-center">

                                            <div className="row ">

                                                <div className="d-flex details justify-content-between">
                                                    <div className="col-md-7 ms-0">

                                                        {publishloading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}
                                                        {error && <div className="alert alert-danger text-center">{error}</div>}
                                                        {success && <div className="alert alert-success text-center">{success}</div>}

                                                        <div className="d-flex justify-content-between">
                                                            <button className="btn btn-danger mb-3" onClick={goBack}><i class="fa-solid fa-arrow-left text-light"></i></button>
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

                                                    <div className="text-center col-md-5 fs-5">
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
                                                <h3 style={{ letterSpacing: '1px' }} className="mt-5">COMMENTS</h3>

                                                <p>Coming Soon...</p>
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
    </>
}

export default SingleAdminQuiz;