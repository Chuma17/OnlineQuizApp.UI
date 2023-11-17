import "./Settings.css"
import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommentLoading from "../../components/CommentLoading";

const ViewAdmins = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [isLoading, setIsLoading] = useState();
    const [admins, setAdmins] = useState([]);

    useEffect(() => {

        async function getAdmins() {

            try {
                setIsLoading(true);

                const response = await axios.get(`User/get-all-admins`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        },
                    },
                );

                if (response.status === 200) {
                    setIsLoading(false);
                    setAdmins(response.data)
                    console.log(response);
                    // setError('');
                }
            } catch (error) {
                setIsLoading(false);

                if (error.response.status === 401) {
                    window.alert('Your session has expired. Login again!');
                    localStorage.removeItem('userDetails');

                    navigate('/login');
                } else {
                    console.error(error.response);
                }
            }
        }

        getAdmins();
    }, []);

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

                                    <Link to="/admin-registration">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="adminReg-tab" data-bs-toggle="tab" data-bs-target="#adminReg-tab-pane" type="button" role="tab" aria-controls="adminReg-tab-pane" aria-selected="true"> Add Admin </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-admins">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="adminView-tab" data-bs-toggle="tab" data-bs-target="#adminView-tab-pane" type="button" role="tab" aria-controls="adminView-tab-pane" aria-selected="false"> View Admins </p>
                                        </li>
                                    </Link>

                                    <Link to="/add-category">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="addCategory-tab" data-bs-toggle="tab" data-bs-target="#addCategory-tab-pane" type="button" role="tab" aria-controls="addCategory-tab-pane" aria-selected="false">Add Category </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-categories">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="viewCategory-tab" data-bs-toggle="tab" data-bs-target="#viewCategory-tab-pane" type="button" role="tab" aria-controls="viewCategory-tab-pane" aria-selected="false">Categories</p>
                                        </li>
                                    </Link>

                                    <Link to="/add-questionType">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="addQuestionType-tab" data-bs-toggle="tab" data-bs-target="#addQuestionType-tab-pane" type="button" role="tab" aria-controls="addQuestionType-tab-pane" aria-selected="false">Add QT </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-questionTypes">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="viewQuestionTypes-tab" data-bs-toggle="tab" data-bs-target="#viewQuestionTypes-tab-pane" type="button" role="tab" aria-controls="viewQuestionTypes-tab-pane" aria-selected="false">View QT</p>
                                        </li>
                                    </Link>

                                </ul >

                                <div className="card col-lg-12 ms-auto me-auto bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">

                                        <h4 className="fw-normal text-center mb-3 pb-3" style={{ letterSpacing: '1px' }}>Admins</h4>

                                        {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><CommentLoading /> </div>}

                                        <table class="table table-hover">
                                            <thead>
                                                <tr className="fs-5">
                                                    <th scope="col">#</th>
                                                    <th scope="col">First Name</th>
                                                    <th scope="col">Last Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    admins.length > 0 ? admins.map((admin, i) => (
                                                        <tr className="fs-5">
                                                            <th scope="row">{i + 1}</th>
                                                            <td>{admin?.firstName}</td>
                                                            <td>{admin?.lastName}</td>
                                                        </tr>
                                                    )) : (
                                                        <>
                                                            <div className="text-center mt-3">
                                                                <h2>No Admins</h2>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </tbody>
                                        </table>

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

export default ViewAdmins;