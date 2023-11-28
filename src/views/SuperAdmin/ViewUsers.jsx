import "./Settings.css"
import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommentLoading from "../../components/CommentLoading";
import Loading from "../../components/Loading";

const ViewUsers = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [isLoading, setIsLoading] = useState();
    const [users, setUsers] = useState([]);    

    async function getUsers() {

        try {
            setIsLoading(true);

            const response = await axios.get(`User/get-all-users`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
            );

            if (response.status === 200) {
                setIsLoading(false);
                setUsers(response.data);
                // console.log(response);
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

    useEffect(() => {

        getUsers();
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

                                    <Link to="/view-admins">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="adminView-tab" data-bs-toggle="tab" data-bs-target="#adminView-tab-pane" type="button" role="tab" aria-controls="adminView-tab-pane" aria-selected="false"> Admins </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-users">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="userView-tab" data-bs-toggle="tab" data-bs-target="#userView-tab-pane" type="button" role="tab" aria-controls="userView-tab-pane" aria-selected="false"> Users </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-categories">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="viewCategory-tab" data-bs-toggle="tab" data-bs-target="#viewCategory-tab-pane" type="button" role="tab" aria-controls="viewCategory-tab-pane" aria-selected="false">Categories</p>
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

                                        <div className="pb-3">
                                            <h4 className="fw-normal text-center" style={{ letterSpacing: '1px' }}>Users</h4>                                            
                                        </div>

                                        {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><CommentLoading /> </div>}

                                        <div style={{ height: '600px', overflowY: 'auto' }}>

                                            <table class="table table-hover">
                                                <thead>
                                                    <tr className="fs-5">
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        users.length > 0 ? users.map((admin, i) => (
                                                            <tr className="fs-5">
                                                                <th scope="row">{i + 1}</th>
                                                                <td>{admin?.firstName} {admin?.lastName}</td>
                                                                <td> <Link to={`/superAdmin-user-quizzes/${admin.id}`}> <button className="btn btn-success"><i class="fa-solid fa-arrow-right text-light"></i></button> </Link> </td>
                                                            </tr>
                                                        )) : (
                                                            <>
                                                                <div className="text-center mt-3">
                                                                    <h2>No Users</h2>
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
            </div>
        </section>        

    </>
}

export default ViewUsers;