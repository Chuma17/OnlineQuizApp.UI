import "./LandingPage.css"
import "./HomePage.css"
import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const LandingPage = () => {
    const [loading, setLoading] = useState();

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [categoryquizzes, setCategoryQuizzes] = useState([]);

    const [searchTerm, setSearchTerm] = useState(null);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 16,
        totalItems: 0,
        totalPages: 0
    });

    async function getCategoryQuizzes() {
        try {
            setLoading(true);

            if (categoryId == null) {
                setLoading(false);
                return
            }

            const response = await axios.get(`Quiz/get-quizzes-in-category?categoryId=${categoryId}`, {
                params: {
                    PageNumber: pagination.currentPage,
                    PageSize: pagination.itemsPerPage
                }
            });

            const { data } = response;
            if (data) {
                setLoading(false);
                setCategoryQuizzes(data);
            }

            if (searchTerm != null) {
                // Filter quizzes based on the search term
                const filteredQuizzes = data.filter((quiz) =>
                    quiz.quizName.toLowerCase().includes(searchTerm.toLowerCase())
                );

                setCategoryQuizzes(filteredQuizzes);
            }

            const paginationHeader = JSON.parse(response.headers["pagination"]);
            setPagination(paginationHeader);
        } catch (error) {
            setLoading(false);
        }

    }

    useEffect(() => {

        getCategoryQuizzes();
    }, [pagination.itemsPerPage, pagination.currentPage, categoryId]);


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

        <section id="hero-banner">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 my-auto mr-auto px-4">
                        <h1 className="h1 h1-responsive">Welcome To <i class="fa-brands fa-teamspeak"></i> Ramen's Trivia,</h1>
                        <p className="fs-5 justified-text">
                            where the excitement of knowledge meets the thrill of competition. Immerse yourself in a world
                            of intriguing questions and engaging quizzes that cater to your curiosity.
                            Let the quest for knowledge begin at Ramen's Trivia!
                        </p>

                    </div>
                    <div className="col-lg-5 col-md-8 ml-auto my-md-auto my-5">
                        <div className="image">
                            <img src={require(`./img/narutomaki.jpg`)} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section id="search-section">
            <div className="container">
                <div className="col-lg-11 mx-auto search-area shadow">
                    <div className="search-items  d-flex justify-content-around">

                        <div className="">

                            <label className="form-label" htmlfor="halls">Category</label>
                            <select
                                value={categoryId}
                                onChange={e => {
                                    setCategoryId(e.target.value);
                                    setSearchTerm("");
                                    getCategoryQuizzes(e.target.value);
                                }}
                                required
                                className="form-select"
                            >
                                <option hidden value="">
                                    --- Select Category ---
                                </option>

                                {categories.length > 0 &&
                                    categories.map(category => {
                                        return (
                                            <option key={category.categoryId} value={category.categoryId}>
                                                {category.categoryName}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>

                        <div className=" mb-4">
                            <label className="form-label">Filter by Name</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="mb-auto mt-auto">
                            <button
                                className=" btn btn-theme"
                                onClick={() => getCategoryQuizzes()}
                            >
                                Search
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </section>


        <section style={{ height: categoryquizzes.length > 0 && !loading ? 'fit-content' : '500px' }}>
            {loading ? <div className="" style={{ textAlign: 'center' }}><Loading /> </div> :

                <div >
                    <div className="container px-1 text-center">

                        <div className="ms-2 mb-3 pagination-icons">
                            <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handleFirstPage} disabled={pagination.currentPage === 1}><i class="fa-solid fa-backward"></i></button>
                            <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handlePrevPage} disabled={pagination.currentPage === 1}><i class="fa-solid fa-caret-left"></i></button>
                            <span className="text-dark">
                                Page:{" "}
                                {categoryquizzes.length > 0
                                    ? `${pagination.currentPage} of ${pagination.totalPages === 0 ? 1 : pagination.totalPages
                                    }`
                                    : 0}
                            </span>
                            <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.totalPages}><i class="fa-solid fa-caret-right"></i></button>
                            <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handleLastPage} disabled={pagination.currentPage === pagination.totalPages || pagination.totalPages <= 1}><i class="fa-solid fa-forward"></i></button>
                        </div>


                        <div className="row">
                            {categoryquizzes.length > 0 ? (
                                categoryquizzes.map(quiz => (
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
                                ))

                            ) : (
                                <div className="col-12 text-center ">
                                    <h4>No quizzes <br />Select a Category</h4>
                                </div>
                            )}

                        </div>

                        <div className="ms-2 mb-5 mt-3 pagination-icons">
                            <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handleFirstPage} disabled={pagination.currentPage === 1}><i class="fa-solid fa-backward"></i></button>
                            <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handlePrevPage} disabled={pagination.currentPage === 1}><i class="fa-solid fa-caret-left"></i></button>
                            <span className="text-dark">
                                Page:{" "}
                                {categoryquizzes.length > 0
                                    ? `${pagination.currentPage} of ${pagination.totalPages === 0 ? 1 : pagination.totalPages
                                    }`
                                    : 0}
                            </span>
                            <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.totalPages}><i class="fa-solid fa-caret-right"></i></button>
                            <button className="btn btn-sm btn-light p-1 m-1 pagination-foward-icons" onClick={handleLastPage} disabled={pagination.currentPage === pagination.totalPages || pagination.totalPages <= 1}><i class="fa-solid fa-forward"></i></button>
                        </div>

                    </div>

                </div>
            }
        </section>


        <section id="about-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 my-auto">
                        <div className="image">
                            <img src={require(`./img/work-quiz.jpg`)} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 pl-lg-5 px-4 mt-md-0 mt-5">
                        <h6 className="h6 color-primary m-0">About Us</h6>
                        <h1 className="h1 h1-responsive mb-4">We Provide The Best Quizzes For You</h1>
                        <p className="fs-5 justified-text">
                            At Ramen's Trivia, we pride ourselves on providing the best quizzes for your enjoyment.
                            With a commitment to quality and diversity, we offer a wide range of quizzes that
                            cater to various interests and knowledge levels. Join us on a journey of discovery,
                            where every quiz is crafted with care to provide you with a unique and enjoyable experience.
                        </p>

                    </div>
                </div>
            </div>
        </section>


        <section id="work-section">
            <div className="container">
                <h1 className="h1 h1-responsive mb-4">How it Works</h1>
                <p className="fs-5 px-4 justified-text">Explore our seamless quiz-taking process: Take a quiz, uncover fascinating insights,
                    and view your results instantly. <p className="text-center">At Ramen's Trivia, it's that easy to engage, learn,
                    and enjoy the rewarding experience of our quizzes.</p> 
                </p>

                <div className="work-items d-flex justify-content-between my-5">
                    <div className="service-show">
                        <i class="fa-brands fa-quinscape"></i>
                        <h4 className="h5 mb-4">Take Quizzes</h4>
                        <p className="fs-6">Take quizzes on diverse topics to challenge your knowledge and <br /> curiosity.
                        </p>
                    </div>

                    <div className="service-show">
                        <i class="fa-solid fa-square-poll-vertical"></i>
                        <h4 className="h5 mb-4">See Results</h4>
                        <p className="fs-6">Instantly view detailed results, track your progress, and gain valuable <br /> insights.
                        </p>
                    </div>

                    <div className="service-show">
                        <i class="fa-solid fa-comment-dots"></i>
                        <h4 className="h5 mb-4">Leave a Comment</h4>
                        <p className="fs-6">Engage with our community by leaving comments and sharing <br /> thoughts.
                        </p>
                    </div>

                </div>
            </div>
        </section>


        <section id="testimonial-section">
            <div className="container">
                <h6 className="h6 color-primary m-0">Testimonial</h6>
                <h1 className="h1 h1-responsive mb-4">What People are Saying</h1>
                <p className="fs-5">
                    Discover what our community is saying about Ramen's Trivia. From enthusiastic testimonials
                    to shared experiences,<br /> our users highlight the engaging and enjoyable nature of our quizzes.
                </p>
                <br /><br />
                <div id="testimonial-slider">

                    <div className="container">

                        <div id="testimonial-slider">
                            <div className="swiper">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="testimonial-list">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-4 text-center mx-auto">
                                                    <div className="image">
                                                        <img src={require(`./img/code-galaxy.jpg`)} alt="" />
                                                    </div>
                                                </div>
                                                <div className="offset-lg-1 col-lg-6 col-md-8 text-left">
                                                    <i className="fas fa-quote-left fa-2x"></i>
                                                    <p className="mt-3 justified-text fs-5">
                                                        Ramen's Trivia has revolutionized my quiz-taking experience with its
                                                        diverse and thought-provoking questions. The platform's user-friendly
                                                        interface and instant results make it a go-to for both casual learners
                                                        and avid quiz enthusiasts.
                                                    </p>
                                                    <br />
                                                    <h4 className="h4">Youtuber</h4>
                                                    <p className="fs-5">Code Galaxy</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        <section id="mail-section">
            <div className="container">
                <h1 className="h1 h1-responsive mb-4">Frequently Asked Questions <br /> (FAQ)</h1>
                <div className="col-lg-8 col-md-11 mx-auto form shadow mt-3">
                    <div className="row">
                        <h4>Coming Soon...</h4>

                    </div>
                </div>
            </div>
        </section>

    </>
}

export default LandingPage;