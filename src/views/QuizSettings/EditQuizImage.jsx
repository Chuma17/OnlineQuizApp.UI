import axios from "../../axios/axios";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";

const EditQuizImage = () => {

    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const quizId = param.get("quizId");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState();

    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUpload, setProfileImageUpload] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInput = useRef(null);

    const user = JSON.parse(localStorage.getItem("userDetails"));

    async function getQuizDetails() {
        try {
            setLoading(true);

            const response = await axios.get(`Quiz/get-quiz-image?quizId=${quizId}`, {

            });

            const { data } = response;
            if (data) {
                setLoading(false);
                // console.log(data)
                setProfileImage(data.imageUrl)
            }

        } catch (error) {
            console.error(error)
        }
    }


    async function UploadPicture(params) {
        try {
            setLoading(true);

            const formData = new FormData();
            if (profileImageUpload) {
                formData.append("profileImage", profileImageUpload);
            }

            const quizPicResponse = await axios.post(`Quiz/upload-quiz-picture?quizId=${quizId}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
            );

            if (quizPicResponse.status === 200) {
                setLoading(false);
                getQuizDetails();
                console.log(quizPicResponse);
                setSuccess(quizPicResponse.data.message);
                // setError('');
            }
        }

        catch (error) {
            setLoading(false);

            console.error(error.quizPicResponse);
            setError(error.quizPicResponse);
        }
    }



    //Delete function
    async function DeletePicture() {
        setError(false);
        setSuccess(false);

        try {
            setLoading(true);

            const response = await axios.delete(`Quiz/delete-quiz-picture`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                },
                params: {
                    quizId: quizId
                }
            });

            if (response.status === 200) {
                setLoading(false);
                getQuizDetails();
                setSuccess(response.data);
            }
        }

        catch (error) {
            setLoading(false);

            console.error(error.response);
            setError(error.response.data);

        }
    }


    useEffect(() => {

        getQuizDetails();
    }, []);

    useEffect(() => {
        let errorTimeoutId;
        let successTimeoutId;

        if (error) {
            errorTimeoutId = setTimeout(() => {
                setError(null);
            }, 2000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
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

                        <div className="bg-glass">
                            <div className="px-4 py-5 px-md-5">

                                <ul className="nav nav-tabs d-flex justify-content-between p-3" id="myTab" role="tablist">

                                    <Link to={`/view-admin-questions-in-quiz/${quizId}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="adminQuestion-tab" data-bs-toggle="tab" data-bs-target="#adminQuestion-tab-pane" type="button" role="tab" aria-controls="adminQuestion-tab-pane" aria-selected="true"> Questions </p>
                                        </li>
                                    </Link>

                                    <Link to={`/edit-quiz-details?quizId=${quizId}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="edit-tab" data-bs-toggle="tab" data-bs-target="#edit-tab-pane" type="button" role="tab" aria-controls="edit-tab-pane" aria-selected="false">Edit </p>
                                        </li>
                                    </Link>

                                    <Link to={`/edit-quiz-image?quizId=${quizId}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="quizImage-tab" data-bs-toggle="tab" data-bs-target="#quizImage-tab-pane" type="button" role="tab" aria-controls="quizImage-tab-pane" aria-selected="false">Image</p>
                                        </li>
                                    </Link>

                                    <Link to={`/view-quiz-records/${quizId}`}>
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="quizRecord-tab" data-bs-toggle="tab" data-bs-target="#quizRecord-tab-pane" type="button" role="tab" aria-controls="quizRecord-tab-pane" aria-selected="false">Records</p>
                                        </li>
                                    </Link>

                                </ul >


                                <div className="card col-lg-6 ms-auto me-auto bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">
                                        <Link to={`/single-admin-quiz/${quizId}`}>
                                            <button className="btn btn-danger"><i class="fa-solid fa-arrow-left text-light"></i></button>
                                        </Link>
                                        <form className="form" onSubmit={UploadPicture}>
                                            <h4 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Update Quiz Picture</h4>

                                            {loading && <div className="mb-3" style={{ textAlign: 'center' }}><Loading /> </div>}
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
                                                        setProfileImageUpload(e.target.files[0]);
                                                        setPreview(URL.createObjectURL(e.target.files[0]));
                                                    }}
                                                    style={{ display: "none" }}
                                                    ref={fileInput}
                                                />
                                                <div className="" style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                                                    {profileImage ? (
                                                        <img
                                                            className="ms-auto me-auto mb-4 mt-2"
                                                            src={preview || profileImage}
                                                            alt="Profile"
                                                            style={{ width: "80%", height: "45%", borderRadius: "10px" }}
                                                        />
                                                    ) : (
                                                        <img
                                                            className="ms-auto me-auto mb-4 mt-2"
                                                            src={preview || require("./images/QuizDefault.jpg")}
                                                            alt="Preview"
                                                            style={{ width: "80%", height: "45%", borderRadius: "10px" }}
                                                        />
                                                    )}
                                                    <div className="text-center">
                                                        <button type="button" className="edit-button btn btn-dark" disabled={profileImage} onClick={() => fileInput.current.click()}>
                                                            <i class="fa-solid fa-image text-light"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="text-center">

                                                <button type="submit" className="edit-button btn btn-success me-2" disabled={profileImage || !profileImageUpload}>
                                                    <i class="fa-solid fa-upload text-light"></i>
                                                </button>

                                                <button type="button" className="edit-button btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteQuizPictureModal" disabled={!profileImage}>
                                                    <i class="fa-solid fa-trash text-light"></i>
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

        <div className="modal fade" id="deleteQuizPictureModal" tabindex="-1" aria-labelledby="deleteQuizPictureModalLabel" aria-hidden="true">
            <div className="modal-dialog text-light">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-light" id="deleteQuizPictureModalLabel">Delete Quiz Picture</h1>
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

export default EditQuizImage;