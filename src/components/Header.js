import { Link, useNavigate } from "react-router-dom";
import "./Header.css"

const ROLES = {
    'Admin': "Admin",
    'SuperAdmin': "SuperAdmin",
    'Participant': "Participant",
}

const Header = () => {

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userDetails"));

    const Logout = async e => {
        e.preventDefault()
        localStorage.removeItem("userDetails");
        navigate("/OnlineQuizApp.UI");
        window.location.reload();
    }

    return <>

        <nav className="navbar navbar-expand-lg navbar-light background-radial-gradient overflow-hidden">
            <div className="container-fluid">
                <Link to="/OnlineQuizApp.UI" className="navbar-brand text-light fs-5 p-2">
                    <i className="fas fa-cubes fa-1x me-1" style={{ color: '#ff6219' }}></i> Quiz App
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span> <i class="fa-solid fa-bars text-light"></i></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    {/* <div className="d-flex justify-content-between align-items-center"> Use ms-auto to push items to the right */}
                    {/* All your links go here */}

                    <div className="ms-auto me-auto">

                        {!userInfo &&
                            <div className="nav-item">
                                <hr className="text-light hr-mobile-only" />

                                <div className="d-flex nav-details">
                                    {/* <Link to="/login" className="nav-login text-light nav-link"> Sign In</Link>
                                    <Link to="/user-registration" className="nav-login text-light nav-link"> Sign Up</Link> */}
                                    <Link to="/login" className="nav-login text-light nav-link mb-2"> <i className="nav-login fa-solid fa-arrow-right-to-bracket text-light"></i> Sign In</Link>
                                    <Link to="/user-registration" className="nav-login text-light nav-link mb-2"> <i className="nav-login fas fa-pen text-light"></i> Sign Up</Link>
                                </div>
                            </div>
                        }

                        <div className="">

                            {userInfo && userInfo.roles.includes(ROLES.Admin) &&
                                <>
                                    <hr className="text-light hr-mobile-only" />

                                    <div className="admin-links d-flex fs-6 nav-item mb-2">
                                        {userInfo && userInfo.roles.includes(ROLES.SuperAdmin) &&
                                            <Link to="/admin-registration" className="text-light nav-link">Admin</Link>
                                        }
                                        <Link to="/" className="text-light nav-link">Quiz</Link>
                                        <Link to="/" className="text-light nav-link">Question</Link>
                                        <Link to="/" className="text-light nav-link">Result</Link>
                                    </div>
                                </>

                            }
                        </div>

                        {userInfo && userInfo.roles.includes(ROLES.Participant) &&
                            <div className="d-flex fs-6">
                                <hr className="text-light hr-mobile-only" />

                                <Link to="/" className="text-light nav-link">Results</Link>
                            </div>
                        }

                    </div>

                    <div className="d-flex second-line mb-2">

                        {userInfo && <>
                            <div className="d-flex">
                                <i className="fas fa-user mt-auto mb-auto fs-5 me-2 nav-username text-light"></i>
                                <span className="me-2 mt-auto mb-auto fs-6 nav-username text-light">Hi, {userInfo && userInfo.firstName}</span>
                            </div>

                        </>}

                        <div className="d-flex superadmin-button">

                            {userInfo &&
                                <button className="btn btn-light my-2 my-sm-0 btn-sm p-0 me-2 ms-2">
                                    <Link to="/change-names" className="text-dark nav-link"><i class="fa-solid fa-gear"></i> Account</Link>
                                </button>
                            }

                            {userInfo &&
                                <>
                                    <button type="button" className="btn btn-danger btn-sm my-2 my-sm-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i className="fa-solid fa-arrow-right-from-bracket me-1 text-light"></i> Sign Out
                                    </button>

                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog text-light">
                                            <div className="modal-content bg-dark">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5 text-light" id="exampleModalLabel">Sign Out</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body text-light">
                                                    Are you sure you want to sign out?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                    <button className="btn btn-danger text-light" onClick={Logout}>
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </>

                            }
                        </div>
                    </div>

                </div>
            </div>
        </nav>

    </>
}

export default Header;