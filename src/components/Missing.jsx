import { Link } from "react-router-dom"

const Missing = () => {
    return <>

        <section className="vh-100 background-radial-gradient overflow-hidden">

            <div className="container px-4 py-4 px-md-5 text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-4">

                    <div className="col-lg-5 ms-auto me-auto mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="bg-glass">
                            <div className="px-4 py-3 px-md-3">
                                <div className="">
                                    <article style={{ padding: "100px" }}>
                                        <h1 className="">Oops!</h1>
                                        <p className="">Page Not Found</p>
                                        <div className="flexGrow">
                                            <Link className="" to="/">Visit Our Homepage</Link>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    </>
}

export default Missing