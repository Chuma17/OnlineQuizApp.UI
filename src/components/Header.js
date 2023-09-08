import { Link, useNavigate } from "react-router-dom";
import "./Header.css"

const Header = () => {

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userDetails"));

    const Logout = async e => {
        e.preventDefault()
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem("userDetails");
            navigate("/OnlineQuizApp.UI");
        }
    }

    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
            {/* <a className="navbar-brand" href="/">BU|Demerit</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">

                <div className="">
                    <Link to="/OnlineQuizApp.UI" className="text-dark fs-5">Quiz App</Link>
                </div>

                <div className="d-flex justify-content-around">

                    {!userInfo &&
                        <div className="d-flex">

                            <Link to="/login" className="text-dark mt-auto mb-auto me-5">Login</Link>
                            
                        </div>
                    }

                    {userInfo && userInfo.role === "Admin" &&
                        <div className="d-flex fs-6">

                            <Link to="/halls" className="text-dark mt-auto mb-auto me-5">Halls</Link>

                            <Link to="/create-hallAdmin" className="text-dark mt-auto mb-auto me-5">Hall Admin</Link>

                            <Link to="/create-porter" className="text-dark mt-auto mb-auto me-5">Porter</Link>

                            <Link to="/create-studentSupport" className="text-dark mt-auto mb-auto me-5">Student Support</Link>

                        </div>
                    }

                    {userInfo && userInfo.role === "Participant" &&
                        <div className="d-flex fs-6">

                            <Link to="create-demerit" className="text-dark mt-auto mb-auto me-5">Create Demerit</Link>

                            <Link to="view-porter-demerits" className="text-dark mt-auto mb-auto me-5">View Demerits</Link>

                        </div>
                    }                    

                </div>

                <div className="text-dark">

                    {userInfo && <>
                        <i className="fas fa-user fs-5 me-1 nav-username"></i><span className="me-4 fs-6 nav-username text-dark">Hi, {userInfo && userInfo.firstName}</span>
                    </>
                    }
                    {userInfo &&
                        <button className="btn btn-danger my-2 my-sm-0 me-4 text-light" onClick={Logout}> <i className="fa-solid fa-arrow-right-from-bracket me-1"></i> Sign Out</button>
                    }

                </div>

            </div>

        </nav>
    </>
}

export default Header;