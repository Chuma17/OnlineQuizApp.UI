import axios from "../../axios/axios";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import "./Account.css"

const ProfilePicture = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInput = useRef(null);

    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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

            const response = await axios.post(`User/upload-profile-picture`, formData, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                },
            });

            if (response.status === 200) {
                setIsLoading(false);

                user.profileUrl = response.data.imageUrl;

                const updatedStudent = JSON.stringify(user);
                localStorage.setItem('userDetails', updatedStudent);

                // // console.log(response);
                setSuccess(response.data.message);
                // setError('');
            }
        }

        catch (error) {
            setIsLoading(false);
            // console.error(error.response);

            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                setIsLoading(false);

                // console.error(error.response);
                setError(error.response.data);
            }
        }
    }

    //Delete function
    async function DeletePicture() {
        setError(false);
        setSuccess(false);

        try {
            setIsLoading(true);

            const response = await axios.delete(`User/delete-profile-picture`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                },
            });

            if (response.status === 200) {

                setIsLoading(false);

                user.profileUrl = null;

                const updatedStudent = JSON.stringify(user);
                localStorage.setItem('userDetails', updatedStudent);

                // // console.log(response);
                setSuccess(response.data);
                // setError('');
            }
        }

        catch (error) {
            setIsLoading(false);
            // console.error(error.response);

            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                setIsLoading(false);

                // console.error(error.response);
                setError(error.response.data);
            }
        }
    }

    useEffect(() => {
        let errorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
            }, 5000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
                // window.location.reload();
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

                                    <Link to="/change-names">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="names-tab" data-bs-toggle="tab" data-bs-target="#names-tab-pane" type="button" role="tab" aria-controls="names-tab-pane" aria-selected="true"> Names </p>
                                        </li>
                                    </Link>

                                    <Link to="/change-username">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="username-tab" data-bs-toggle="tab" data-bs-target="#username-tab-pane" type="button" role="tab" aria-controls="username-tab-pane" aria-selected="false"> Username </p>
                                        </li>
                                    </Link>

                                    <Link to="/change-email">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="email-tab" data-bs-toggle="tab" data-bs-target="#email-tab-pane" type="button" role="tab" aria-controls="email-tab-pane" aria-selected="false"> Email </p>
                                        </li>
                                    </Link>

                                    <Link to="/change-password">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" type="button" role="tab" aria-controls="password-tab-pane" aria-selected="false">Password </p>
                                        </li>
                                    </Link>

                                    <Link to="/two-factor-authentication">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="2fa-tab" data-bs-toggle="tab" data-bs-target="#2fa-tab-pane" type="button" role="tab" aria-controls="2fa-tab-pane" aria-selected="false">Two Factor</p>
                                        </li>
                                    </Link>

                                    <Link to="/profile-picture">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</p>
                                        </li>
                                    </Link>
                                </ul >

                                <div className="card col-lg-6 ms-auto me-auto bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">

                                        <form className="form" onSubmit={submitHandler}>
                                            <h4 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Update Profile Picture</h4>

                                            {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}
                                            {error && (
                                                <div className="alert alert-danger">
                                                    {typeof error === "object" ? (
                                                        Object.values(error).map((messages, index) => (
                                                            <ul key={index}>
                                                                {messages.map((message, i) => (
                                                                    <li key={i}>{message}</li>
                                                                ))}
                                                            </ul>
                                                        ))
                                                    ) : (
                                                        <div className="text-center">{error}</div>
                                                    )}
                                                </div>
                                            )}
                                            {success && <div className="me-4 ms-4 alert alert-success text-center">{success}</div>}


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
                                                    {user.profileUrl ? (
                                                        <img
                                                            className="ms-auto me-auto mb-4 mt-2"
                                                            src={preview || user.profileUrl}
                                                            alt="Profile"
                                                            style={{ width: "80%", height: "45%", borderRadius: "10px" }}
                                                            onClick={() => fileInput.current.click()}
                                                        />
                                                    ) : (
                                                        <img
                                                            className="ms-auto me-auto mb-4 mt-2"
                                                            src={preview || require("./images/user.png")}
                                                            alt="Preview"
                                                            style={{ width: "80%", height: "45%", borderRadius: "10px" }}
                                                            onClick={() => fileInput.current.click()}
                                                        />
                                                    )}
                                                    <div className="text-center">
                                                        <button type="button" className="btn btn-dark w-" onClick={() => fileInput.current.click()}>
                                                            Choose a picture
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>           


                                            <div className="text-center">

                                                <button type="submit" className="edit-button btn btn-success me-2" disabled={!preview}>
                                                    Upload
                                                </button>

                                                <button type="button" className="edit-button btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteProfilePictureModal" disabled={!user.profileUrl}>
                                                    Delete
                                                </button>
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
        <div className="modal fade" id="deleteProfilePictureModal" tabindex="-1" aria-labelledby="deleteProfilePictureModalLabel" aria-hidden="true">
            <div className="modal-dialog text-light">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-light" id="deleteProfilePictureModalLabel">Delete Profile Picture</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-light">
                        Are you sure you want to delete this picture?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                        <button className="btn btn-danger text-light" data-bs-dismiss="modal" onClick={DeletePicture}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ProfilePicture;