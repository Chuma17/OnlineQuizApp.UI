const LandingPage = () => {
    return <>

        {/* <header class="header">
            <div class="container">
                <nav class="navbar navbar-expand-lg">

                    <a class="navbar-brand" href="#"> <span class="color-primary">R.</span> <span>State</span></a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                        aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="fas fa-bars"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="basicExampleNav">

                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Sales</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Building</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Agent</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contact Us</a>
                            </li>
                            <li class="nav-item">
                                <button class="nav-btn btn btn-theme">Get Started</button>
                            </li>

                        </ul>

                    </div>

                </nav>
            </div>
        </header>


        <section id="hero-banner">
            <div class="container">
                <div class="row">
                    <div class="col-md-5 my-auto mr-auto">
                        <h1 class="h1 h1-responsive">Find Your Next Perfect Place to Live</h1>
                        <p>In expecting display, thought. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
                            libero minus maiores? Pariatur dolor consectetur nemo animi.
                        </p>
                        <button class="btn btn-theme-2">Learn More</button>
                        <button class="btn btn-play"><i class="fas fa-play"></i></button>
                    </div>
                    <div class="col-lg-5 col-md-7 ml-auto my-md-auto my-5">
                        <div class="image">
                            <img src="/img/apartment.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section id="search-section">
            <div class="container">
                <div class="col-lg-11 mx-auto search-area shadow">
                    <div class="search-items row d-flex">
                        <div class="col-md-3">
                            <select name="" id="">
                                <option value="">Location</option>
                                <option value="">Location</option>
                                <option value="">Location</option>
                            </select>
                            <input type="text" name="" class="form-control" placeholder="Location" />
                        </div>
                        <div class="col-md-3">
                            <select name="" id="">
                                <option value="">Property Type</option>
                                <option value="">Type 1</option>
                                <option value="">Type 2</option>
                            </select>
                            <input type="text" name="" class="form-control" placeholder="Property Type" />
                        </div>
                        <div class="col-md-3">
                            <select name="" id="">
                                <option value="">Max Price</option>
                                <option value="">Min Price</option>
                                <option value="">Average</option>
                            </select>
                            <input type="text" name="" class="form-control" placeholder="$6,500" />
                        </div>
                        <div class="col-lg-2 col-md-3 ml-auto my-auto">
                            <button class="btn btn-theme">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br /><br />
        </section>


        <section id="about-section">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 my-auto">
                        <div class="image">
                            <img src="/img/home.jpg" alt="" />
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-6 pl-lg-5 px-4 mt-md-0 mt-5">
                        <h6 class="h6 color-primary m-0">About Us</h6>
                        <h1 class="h1 h1-responsive mb-4">We Provide The Best Property For You</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, esse facere! A, obcaecati? Iste
                            exercitationem velit veniam nisi voluptatum.</p>
                        <p>Quo corrupti vitae est modi nobis nulla eum minima recusandae eos.</p>
                        <p>Quo corrupti vitae est modi nobis nulla eum minima recusandae eos.</p>

                        <button class="btn btn-theme-2">Learn More</button>
                        <button class="btn btn-play"><i class="fas fa-play"></i></button>
                    </div>
                </div>
            </div>
        </section>


        <section id="services-section">
            <div class="container">
                <div class="services-items d-flex justify-content-between">
                    <div class="shadow service-show">
                        <i class="fas fa-user"></i>
                        <h4 class="h5">Make Your Dream Come True</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>

                    <div class="shadow service-show">
                        <i class="fas fa-desktop"></i>
                        <h4 class="h5">Start Your Membership</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>

                    <div class="shadow service-show">
                        <i class="fas fa-home"></i>
                        <h4 class="h5">Enjoy Your New Home</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>

                </div>
            </div>
        </section>


        <section id="property-section">
            <div class="container">
                <h6 class="h6 color-primary m-0">Recent</h6>
                <h1 class="h1 h1-responsive mb-4">Recently Added Properties</h1>
                <div class="text-right">
                    <a href="#">Find More Projects <i class="fas fa-long-arrow-alt-right ml-2"></i></a>
                </div>

                <div id="property-slider">
                    <div class="swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="property-list shadow">
                                    <div class="image">
                                        <img src="/img/property-1.jpg" alt="" />
                                    </div>
                                    <div class="text-right">
                                        <h4 class="h5">$10,990</h4>
                                    </div>
                                    <div class="d-flex justify-content-between mb-4">
                                        <div class="item">
                                            <h4 class="h5 m-0">Palace</h4>
                                            <p class="m-0">City, Country</p>
                                        </div>
                                        <div class="item d-flex align-self-center">
                                            <i class="fas fa-bed mr-2 align-self-center"></i>
                                            <span class="mr-3">5</span>
                                            <i class="fas fa-bath mr-2 align-self-center"></i>
                                            <span>3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="swiper-slide">
                                <div class="property-list shadow">
                                    <div class="image">
                                        <img src="/img/home-pic-1.jpg" alt="" />
                                    </div>
                                    <div class="text-right">
                                        <h4 class="h5">$10,990</h4>
                                    </div>
                                    <div class="d-flex justify-content-between mb-4">
                                        <div class="item">
                                            <h4 class="h5 m-0">Palace</h4>
                                            <p class="m-0">City, Country</p>
                                        </div>
                                        <div class="item d-flex align-self-center">
                                            <i class="fas fa-bed mr-2 align-self-center"></i>
                                            <span class="mr-3">5</span>
                                            <i class="fas fa-bath mr-2 align-self-center"></i>
                                            <span>3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="swiper-slide">
                                <div class="property-list shadow">
                                    <div class="image">
                                        <img src="/img/home-pic-2.jpg" alt="" />
                                    </div>
                                    <div class="text-right">
                                        <h4 class="h5">$10,990</h4>
                                    </div>
                                    <div class="d-flex justify-content-between mb-4">
                                        <div class="item">
                                            <h4 class="h5 m-0">Palace</h4>
                                            <p class="m-0">City, Country</p>
                                        </div>
                                        <div class="item d-flex align-self-center">
                                            <i class="fas fa-bed mr-2 align-self-center"></i>
                                            <span class="mr-3">5</span>
                                            <i class="fas fa-bath mr-2 align-self-center"></i>
                                            <span>3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="swiper-slide">
                                <div class="property-list shadow">
                                    <div class="image">
                                        <img src="/img/home-pic-3.jpg" alt="" />
                                    </div>
                                    <div class="text-right">
                                        <h4 class="h5">$10,990</h4>
                                    </div>
                                    <div class="d-flex justify-content-between mb-4">
                                        <div class="item">
                                            <h4 class="h5 m-0">Palace</h4>
                                            <p class="m-0">City, Country</p>
                                        </div>
                                        <div class="item d-flex align-self-center">
                                            <i class="fas fa-bed mr-2 align-self-center"></i>
                                            <span class="mr-3">5</span>
                                            <i class="fas fa-bath mr-2 align-self-center"></i>
                                            <span>3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section id="work-section">
            <div class="container">
                <h6 class="h6 color-primary m-0">Work</h6>
                <h1 class="h1 h1-responsive mb-4">How it Works</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet necessitatibus ut corporis rem <br />
                    doloribus? Aliquid illum assumenda voluptatum hic quis.</p>

                <div class="work-items d-flex justify-content-between my-5">
                    <div class="service-show">
                        <i class="fas fa-search"></i>
                        <h4 class="h5 mb-4">Find Home</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sit amet consectetur adipisicing elit.
                        </p>
                    </div>

                    <div class="service-show">
                        <i class="fas fa-people-carry"></i>
                        <h4 class="h5 mb-4">Meet Roomates</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sit amet consectetur adipisicing elit.
                        </p>
                    </div>

                    <div class="service-show">
                        <i class="fas fa-shield-alt"></i>
                        <h4 class="h5 mb-4">Make it Official</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sit amet consectetur adipisicing elit.
                        </p>
                    </div>

                </div>
            </div>
        </section>


        <section id="feature-section">
            <div class="container">
                <h6 class="h6 color-primary m-0">Recent</h6>
                <h1 class="h1 h1-responsive mb-4">Our Featured Properties</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet <br /> necessitatibus ut corporis rem
                    doloribus?Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <br />
                <div class="col-md-11 mx-auto text-left">

                    <div class="row">
                        <div class="col-lg-4 col-md-6 mx-auto my-3">
                            <div class="property-list shadow">
                                <div class="image">
                                    <img src="/img/property-3.jpg" alt="" />
                                </div>
                                <div class="text-right">
                                    <h4 class="h5">$10,990</h4>
                                </div>
                                <div class="d-flex justify-content-between mb-4">
                                    <div class="item">
                                        <h4 class="h5 m-0">Palace</h4>
                                        <p class="m-0">City, Country</p>
                                    </div>
                                    <div class="item d-flex align-self-center">
                                        <i class="fas fa-bed mr-2 align-self-center"></i>
                                        <span class="mr-3">5</span>
                                        <i class="fas fa-bath mr-2 align-self-center"></i>
                                        <span>3</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 mx-auto my-3">
                            <div class="property-list shadow">
                                <div class="image">
                                    <img src="/img/property-1.jpg" alt="" />
                                </div>
                                <div class="text-right">
                                    <h4 class="h5">$10,990</h4>
                                </div>
                                <div class="d-flex justify-content-between mb-4">
                                    <div class="item">
                                        <h4 class="h5 m-0">Palace</h4>
                                        <p class="m-0">City, Country</p>
                                    </div>
                                    <div class="item d-flex align-self-center">
                                        <i class="fas fa-bed mr-2 align-self-center"></i>
                                        <span class="mr-3">5</span>
                                        <i class="fas fa-bath mr-2 align-self-center"></i>
                                        <span>3</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 mx-auto my-3">
                            <div class="property-list shadow">
                                <div class="image">
                                    <img src="/img/flat.jpg" alt="" />
                                </div>
                                <div class="text-right">
                                    <h4 class="h5">$10,990</h4>
                                </div>
                                <div class="d-flex justify-content-between mb-4">
                                    <div class="item">
                                        <h4 class="h5 m-0">Palace</h4>
                                        <p class="m-0">City, Country</p>
                                    </div>
                                    <div class="item d-flex align-self-center">
                                        <i class="fas fa-bed mr-2 align-self-center"></i>
                                        <span class="mr-3">5</span>
                                        <i class="fas fa-bath mr-2 align-self-center"></i>
                                        <span>3</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 mx-auto my-3">
                            <div class="property-list shadow">
                                <div class="image">
                                    <img src="/img/home-pic-1.jpg" alt="" />
                                </div>
                                <div class="text-right">
                                    <h4 class="h5">$10,990</h4>
                                </div>
                                <div class="d-flex justify-content-between mb-4">
                                    <div class="item">
                                        <h4 class="h5 m-0">Palace</h4>
                                        <p class="m-0">City, Country</p>
                                    </div>
                                    <div class="item d-flex align-self-center">
                                        <i class="fas fa-bed mr-2 align-self-center"></i>
                                        <span class="mr-3">5</span>
                                        <i class="fas fa-bath mr-2 align-self-center"></i>
                                        <span>3</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 mx-auto my-3">
                            <div class="property-list shadow">
                                <div class="image">
                                    <img src="/img/home-pic-2.jpg" alt="" />
                                </div>
                                <div class="text-right">
                                    <h4 class="h5">$10,990</h4>
                                </div>
                                <div class="d-flex justify-content-between mb-4">
                                    <div class="item">
                                        <h4 class="h5 m-0">Palace</h4>
                                        <p class="m-0">City, Country</p>
                                    </div>
                                    <div class="item d-flex align-self-center">
                                        <i class="fas fa-bed mr-2 align-self-center"></i>
                                        <span class="mr-3">5</span>
                                        <i class="fas fa-bath mr-2 align-self-center"></i>
                                        <span>3</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 mx-auto my-3">
                            <div class="property-list shadow">
                                <div class="image">
                                    <img src="/img/home-pic-3.jpg" alt="" />
                                </div>
                                <div class="text-right">
                                    <h4 class="h5">$10,990</h4>
                                </div>
                                <div class="d-flex justify-content-between mb-4">
                                    <div class="item">
                                        <h4 class="h5 m-0">Palace</h4>
                                        <p class="m-0">City, Country</p>
                                    </div>
                                    <div class="item d-flex align-self-center">
                                        <i class="fas fa-bed mr-2 align-self-center"></i>
                                        <span class="mr-3">5</span>
                                        <i class="fas fa-bath mr-2 align-self-center"></i>
                                        <span>3</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="my-5 text-center">
                        <button class="btn btn-theme">Load More</button>
                    </div>

                </div>
            </div>
        </section>


        <section id="testimonial-section">
            <div class="container">
                <h6 class="h6 color-primary m-0">Testimonial</h6>
                <h1 class="h1 h1-responsive mb-4">What People are Saying</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet <br /> necessitatibus ut corporis rem
                    doloribus?Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <br /><br />
                <div id="testimonial-slider">

                    <div class="container">
                        <div class="text-right">
                            <a href="#">Find More Projects <i class="fas fa-long-arrow-alt-right ml-2"></i></a>
                        </div>

                        <div id="testimonial-slider">
                            <div class="swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <div class="testimonial-list">
                                            <div class="row">
                                                <div class="col-lg-4 col-md-4 col-4 text-center mx-auto">
                                                    <div class="image">
                                                        <img src="/img/property-1.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <div class="offset-lg-1 col-lg-6 col-md-8 text-left">
                                                    <i class="fas fa-quote-left fa-2x"></i>
                                                    <p class="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Repellendus cupiditate obcaecati dolorum, facilis temporibus quam
                                                        nemo nihil, a voluptatibus eveniet dolorem perspiciatis? Numquam
                                                        beatae repellat perspiciatis non omnis molestiae reprehenderit?</p>
                                                    <br />
                                                    <h4 class="h4">Youtuber</h4>
                                                    <p>Code Galaxy</p>
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
            <div class="container">
                <h1 class="h1 h1-responsive mb-4">Have Questions in mind? <br /> Let Us help You</h1>
                <div class="col-lg-8 col-md-11 mx-auto form shadow mt-3">
                    <div class="row">
                        <div class="col-md-9 my-auto">
                            <input type="text" class="form-control" placeholder="yourmail@domain.com" />
                        </div>
                        <div class="col-md-3 text-right">
                            <button class="btn btn-theme">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <footer id="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-2 col-md-3 my-lg-auto my-4">
                        <h4 class="h3">R.State</h4>
                    </div>
                    <div class="col-lg-2 col-md-3 col-6 my-lg-auto my-4">
                        <h6 class="m-0 h6">Quick Links</h6>
                        <hr color="white" />
                        <ul>
                            <li><a href="#">Architecture</a></li>
                            <li><a href="#">Agency</a></li>
                            <li><a href="#">Asset Voluation</a></li>
                            <li><a href="#">Building</a></li>
                            <li><a href="#">Business Rates</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-2 col-md-3 col-6 my-lg-auto my-4">
                        <h6 class="m-0 h6">Location</h6>
                        <hr color="white" />
                        <ul>
                            <li><a href="#">Architecture</a></li>
                            <li><a href="#">Agency</a></li>
                            <li><a href="#">Asset Voluation</a></li>
                            <li><a href="#">Building</a></li>
                            <li><a href="#">Business Rates</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-2 col-md-3 col-6 my-lg-0  my-4">
                        <h6 class="m-0 h6">Services</h6>
                        <hr color="white" />
                        <ul>
                            <li><a href="#">Properties</a></li>
                            <li><a href="#">Auction</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-2">
                        <h6 class="m-0 h6">Contact</h6>
                        <hr color="white" />
                        <ul>
                            <li>+233948989003</li>
                            <li>harrycraig34@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer> */}

    </>
}

export default LandingPage;