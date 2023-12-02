import "./LandingPage.css"
import "./HomePage.css"
import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const LandingPage = () => {
    const [loading, setLoading] = useState();

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryquizzes, setCategoryQuizzes] = useState([]);

    const [searchTerm, setSearchTerm] = useState(null);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 8,
        totalItems: 0,
        totalPages: 0
    });


    async function getCategoryQuizzes() {
        try {
            setCategoryQuizzes([]);
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

            const paginationHeader = JSON.parse(response.headers["pagination"]);
            setPagination(paginationHeader);
        } catch (error) {
            setLoading(false);
        }

    }


    async function getSearchedCategoryQuizzes() {
        if (searchTerm == null) {
            return
        }

        try {
            setLoading(true);

            if (categoryId == null) {
                setLoading(false);
                return
            }

            const response = await axios.get(`Quiz/get-search-quizzes-in-category?categoryId=${categoryId}`, {
                params: {
                    searchQuery: searchTerm
                }
            });

            const { data } = response;
            if (data) {
                setLoading(false);
                setCategoryQuizzes(data);
            }

        } catch (error) {
            setLoading(false);
        }

    }

    useEffect(() => {

        if (categoryId && !searchTerm) {
            getCategoryQuizzes();
        }

        if (categoryId && searchTerm) {
            getSearchedCategoryQuizzes();
        }

    }, [pagination.currentPage, categoryId, searchTerm]);


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
                    <div className="search-items d-flex justify-content-around">

                        <div className="ms-auto me-auto">

                            <label className="form-label" htmlfor="halls">Category</label>
                            <select
                                value={categoryId}
                                onChange={e => {
                                    setCategoryId(e.target.value);
                                    setSearchTerm(null);
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

                        <div className="mt-auto mb-auto ms-auto me-auto">
                            <label className="form-label">Filter by Name</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>

                        <div className="mb-auto mt-auto ms-auto me-auto">
                            <button
                                className="btn btn-dark"
                                onClick={() => getSearchedCategoryQuizzes()}
                            >
                                <i class="fa-solid fa-magnifying-glass text-light"></i>
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

                        {searchTerm ? null : (
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
                        )}



                        <div className="row">
                            {categoryquizzes.length > 0 ? (
                                categoryquizzes.map(quiz => (
                                    <div className="col-md-3 d-flex justify-content-evenly" key={quiz.id}>

                                        <Link to={`/single-participant-quiz/${quiz.quizId}`}>
                                            <div className="card mt-4 home-card">
                                                <img src={quiz.imageUrl || require('./images/QuizDefault.jpg')} className="home-card-image card-img-top p-3" alt="Default Quiz" />

                                                <div className="card-body text-center fs-5">
                                                    <h3 className="card-title">{quiz.quizName}</h3>
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

                        {searchTerm ? null : (
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
                        )}


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
                <div className="col-lg- col-md- mx-auto form shadow mt-3">
                    <div className="row">
                        <div className="participant-accordion justified-text fs-6">

                            <h3 className="faq-header text-center mb-3">Participant's FAQ</h3>
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            How can I find the available quizzes to take?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Right below the welcome banner, there is a section with 3 items: Category,
                                            Filter by Name and a search button. By default, there will be no quizzes
                                            on display. You have to go through the list of categories and select one.
                                            Only then will the quizzes associated with that category, be listed.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            How does the search functionality work?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            After you have selected a category and had the associated quizzes listed, you
                                            can filter through the list by name. For quizzes that have more than one word,
                                            searching with the second or third word will still work. E.g., “Chemical bonds
                                            in Chemistry”, searching for “bonds” will work, as well as “chemistry”.
                                            You also don’t have to search for a complete word but be sure to get the
                                            spelling right.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Why do I need to have an account and log in just to take a quiz; it’s just a quiz app?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            You need to have an account in order to keep track of your interactions with the
                                            app. To be able to store and retrieve your results, to add comments. This is
                                            not a regular one-time quiz app.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingFour">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            What do I do if I accidentally exit an ongoing quiz before submitting?
                                        </button>
                                    </h2>
                                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Exiting an ongoing quiz before submission can cause panic, but you shouldn’t worry.
                                            First off, if you feel like going through the stress of looking for the quiz
                                            again and entering it, that’s fine. Also, you can’t start another quiz without
                                            finishing the ongoing quiz, so no need to try that. However, there is a shortcut.
                                            On the navigation bar, as soon as you start a quiz, a new button appears there,
                                            a green button labelled “OQ”, short for “Ongoing Quiz”. Wherever you are in the
                                            app, with a click/tap of that button, you would be directed back to the ongoing
                                            quiz. Once the quiz is submitted, the button vanishes.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingFive">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            Why don’t I get redirected to the result page after I submit a quiz?
                                        </button>
                                    </h2>
                                    <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            That’s because Ramen’s Trivia is not a one-time quiz taker. One might want to post
                                            a comment or try out other quizzes. Some people have anxiety and might not want to
                                            see the result right after. Not everyone would want to see the result immediately,
                                            that’s why you were given a choice.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingSix">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                            How do I check my results?
                                        </button>
                                    </h2>
                                    <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            It’s quite simple. On the navigation bar, click/tap on the “Results” text and you
                                            will be redirected to the results page. From there, you can choose any quiz to
                                            check from. Once a quiz has been selected, a list of results will appear. Since
                                            you can take a quiz more than once, all the records are stored in order of
                                            submission date. Click/tap on the desired result and view the corrections.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingSeven">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                            Do the results provide explanations for the answers?
                                        </button>
                                    </h2>
                                    <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            No, they don’t. At least not yet. Our team is still working on that.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingEight">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                            Why can’t I see the corrections for all the questions in a quiz?
                                        </button>
                                    </h2>
                                    <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            The reason for that is to encourage all participants to attempt all questions.
                                            If the liberty is provided, some participants might be tempted to answer ONE
                                            question, submit and get the corrections for ALL the questions. A literal One
                                            for All. That takes out the fun. Even if one doesn’t know the answers to a
                                            question, it’s best to try as hard as one can. For that reason, you only get the
                                            corrections to the questions attempted.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingNine">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                            What are the uses of a profile picture in a quiz app?
                                        </button>
                                    </h2>
                                    <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Not much, actually. It would only appear publicly on your comments. Even though
                                            it doesn’t have that many appearances, it would still be appreciated to have one.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingTen">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                            How do I add and change my profile picture?
                                        </button>
                                    </h2>
                                    <div id="collapseTen" class="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            On the navigation bar, click/tap on the white button with a “settings” icon and
                                            navigate to the tab labelled “profile”. The mechanics is as such. If you have
                                            no picture uploaded, you can use the black button to select a picture. Once
                                            there is a preview, you can use the green button to upload the picture. If
                                            you have a picture uploaded and you want to change it, you can’t get right
                                            into it by using the black button. The picture has to be deleted first, only
                                            then would you be able to select and upload a new picture.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingEleven">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                                            Why is there no peek button to see my password while typing?
                                        </button>
                                    </h2>
                                    <div id="collapseEleven" class="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Ahh yes, the infamous peek button that makes our lives easier. Well, easier
                                            isn’t always better. The peek button was not added so as to negate attacks
                                            via social engineering. I.e., to prevent situations like having a person
                                            close to you, PEEK at your device while you’re typing in the password. If
                                            you get the password wrong, then just type it again. I mean, there really
                                            is no rush.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingTwelve">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
                                            What do I do if I forget my password?
                                        </button>
                                    </h2>
                                    <div id="collapseTwelve" class="accordion-collapse collapse" aria-labelledby="headingTwelve" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            This is bound to happen to everyone at least once in a life time, so rest assured,
                                            Ramen’s Trivia has you covered. From the login page, click/tap on the “forgot
                                            password” text and you’d be redirected to another page. Input your current
                                            Gmail address, hit ‘execute’ and you’d be redirected to another page. If
                                            you had already done this and for some reason, you left that page, there’s
                                            no need to do it again. Simply click/tap on the “Reset Password” text below.
                                            At this point, a token would’ve been sent to your Gmail. In the reset
                                            password page, type in the same, current Gmail address, your new password,
                                            and copy the token that was sent to your mail and paste it in the box meant
                                            for it. Hit execute and that’s all. Although, this time, be sure to write
                                            down your password somewhere, so as not to forget.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingThirteen">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">
                                            I didn't receive a confirmation link in my Gmail after registration, not even
                                            after requesting for another. Why?
                                        </button>
                                    </h2>
                                    <div id="collapseThirteen" class="accordion-collapse collapse" aria-labelledby="headingThirteen" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            If you didn't receive a confirmation link, then it means your Gmail address is invalid.
                                            Try registering again and this time, be sure that the Gmail address is valid.
                                            Oh, one last thing. You won’t be able to register with the same username anymore.
                                        </div>
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

export default LandingPage;