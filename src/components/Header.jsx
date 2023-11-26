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
    const quiz = JSON.parse(localStorage.getItem("quizId"));

    const Logout = async e => {
        e.preventDefault();
        localStorage.removeItem("userDetails");
        navigate("/");
        // window.location.reload();
    }

    return <>

        <nav className="navbar navbar-expand-lg navbar-light background-radial-gradient overflow-hidden">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-light fs-5 p-2">
                    <i className="fas fa-cubes fa-1x me-1" style={{ color: '#ff6219' }}></i> Ramen's Trivia
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span> <i className="fa-solid fa-bars text-light"></i></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    {/* <div className="d-flex justify-content-between align-items-center"> Use ms-auto to push items to the right */}
                    {/* All your links go here */}

                    <div className="ms-auto me-auto">

                        {!userInfo &&
                            <div className="nav-item">
                                <hr className="text-light hr-mobile-only" />

                                <div className="d-flex nav-details">
                                    <Link to="/login" className="nav-login text-light nav-link mb-2"> <i className="nav-login fa-solid fa-arrow-right-to-bracket text-light"></i> Sign In</Link>
                                    <Link to="/user-registration" className="nav-login text-light nav-link mb-2"> <i class="nav-login fa-solid fa-user-plus text-light"></i> Sign Up</Link>
                                </div>
                            </div>
                        }

                        <div className="">

                            {userInfo && userInfo.roles.includes(ROLES.Admin) &&
                                <>
                                    <hr className="text-light hr-mobile-only" />

                                    <div className="admin-links d-flex justify-content-between fs-6 nav-item mt-auto mb-auto">
                                        {userInfo && userInfo.roles.includes(ROLES.SuperAdmin) &&
                                            <Link to="/admin-registration" className="text-light nav-link mt-auto mb-auto">S. Admin</Link>
                                        }
                                        <Link to="/create-quiz" className="text-light nav-link mt-auto mb-auto">Quiz</Link>
                                        <Link to="/add-questions-to-bank" className="text-light nav-link mt-auto mb-auto">Question</Link>
                                        <Link to="/participant-result" className="text-light nav-link mt-auto mb-auto">Result</Link>

                                    </div>
                                </>
                            }

                        </div>

                        {userInfo && userInfo.roles.includes(ROLES.Participant) &&
                            <div className="d-flex text-center fs-6">
                                <hr className="text-light hr-mobile-only" />

                                <Link to="/participant-result" className="text-light nav-link">Results</Link>
                            </div>
                        }



                    </div>

                    <div className="d-flex justify-content-around second-line mb-2">

                        {userInfo && <>
                            <div className="d-flex">
                                {userInfo.profileUrl ? (
                                    <Link to="/profile-picture">
                                        <img
                                            className="me-2 nav-picture"
                                            src={userInfo.profileUrl}
                                            alt="Profile"
                                        />
                                    </Link>

                                ) : (
                                    <i className="fas fa-user mt-auto mb-auto fs-5 me- nav-username text-light"></i>
                                )}


                            </div>

                        </>}

                        <div className="d-flex superadmin-button">

                            {quiz &&
                                <Link to={`/ongoing-quiz/${quiz}`} className="text-light nav-link">
                                    <button className="btn btn-success">OQ</button>
                                </Link>
                            }

                            {userInfo &&
                                <button className="btn btn-light my-2 my-sm-0 btn-sm p-0 me-2">
                                    <Link to="/change-names" className="text-dark nav-link"><i className="fa-solid fa-gear"></i> </Link>
                                </button>
                            }

                            {userInfo &&
                                <>
                                    <button type="button" className="btn btn-danger btn-sm my-2 ms-0 my-sm-0" data-bs-toggle="modal" data-bs-target="#signOutModal">
                                        <i className="fa-solid fa-arrow-right-from-bracket text-light"></i>
                                    </button>

                                    <div className="modal fade" id="signOutModal" tabindex="-1" aria-labelledby="signOutModalLabel" aria-hidden="true">
                                        <div className="modal-dialog text-light">
                                            <div className="modal-content bg-dark">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5 text-light" id="signOutModalLabel">Sign Out</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body text-light">
                                                    Are you sure you want to sign out?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                    <button className="btn btn-danger text-light" data-bs-dismiss="modal" onClick={Logout}>
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