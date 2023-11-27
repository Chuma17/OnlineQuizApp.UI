import "./Settings.css"
import axios from "../../axios/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommentLoading from "../../components/CommentLoading";
import Loading from "../../components/Loading";


const ViewCategories = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [isLoading, setIsLoading] = useState();
    const [isCategoryLoading, setIsCategoryLoading] = useState();
    const [categories, setCategories] = useState([]);

    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function getCategories() {

        try {
            setIsLoading(true);

            const response = await axios.get(`Category/get-all-categories`,
                {
                },
            );

            if (response.status === 200) {
                setIsLoading(false);
                setCategories(response.data)
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

    useEffect(() => {        

        getCategories();
    }, []);


    async function submitHandler(e) {
        e.preventDefault();

        if (categoryName == "" || categoryDescription == "") {
            setError("Fill in all the fields");
            return;
        }

        try {
            setIsCategoryLoading(true);

            const response = await axios.post(`Category/add-category`, { categoryName, categoryDescription },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                },
            );

            if (response.status === 200) {
                setIsCategoryLoading(false);
                getCategories();
                console.log(response);
                setSuccess(response.data);
                // setError('');
            }
        } catch (error) {
            setIsCategoryLoading(false);

            if (error.response.status === 401) {
                window.alert('Your session has expired. Login again!');
                localStorage.removeItem('userDetails');

                navigate('/login');
            } else {
                console.error(error.response);
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
            }, 2000);
        }

        if (success) {
            successTimeoutId = setTimeout(() => {
                setSuccess(null);
                setCategoryName("");
                setCategoryDescription("");
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

                                    <Link to="/admin-registration">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="adminReg-tab" data-bs-toggle="tab" data-bs-target="#adminReg-tab-pane" type="button" role="tab" aria-controls="adminReg-tab-pane" aria-selected="true"> Add Admin </p>
                                        </li>
                                    </Link>

                                    <Link to="/view-admins">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link" id="adminView-tab" data-bs-toggle="tab" data-bs-target="#adminView-tab-pane" type="button" role="tab" aria-controls="adminView-tab-pane" aria-selected="false"> Admins </p>
                                        </li>
                                    </Link>                                    

                                    <Link to="/view-categories">
                                        <li className="nav-item" role="presentation">
                                            <p className="nav-link active" id="viewCategory-tab" data-bs-toggle="tab" data-bs-target="#viewCategory-tab-pane" type="button" role="tab" aria-controls="viewCategory-tab-pane" aria-selected="false">Categories</p>
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

                                        <div className="d-flex justify-content-around pb-3">
                                            <h4 className="fw-normal text-center " style={{ letterSpacing: '1px' }}>Categories</h4>

                                            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#AddCategoryModal" title="Add Category">
                                                <i class="fa-solid fa-plus text-light"></i>
                                            </button>


                                        </div>

                                        {isLoading && <div className="mb-3" style={{ textAlign: 'center' }}><CommentLoading /> </div>}

                                        <table class="table table-hover">

                                            <thead>
                                                <tr className="fs-5">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Category</th>
                                                    <th className="mobile-description" scope="col">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    categories.length > 0 ? categories.map((category, i) => (
                                                        <tr className="fs-5">
                                                            <th scope="row">{i + 1}</th>
                                                            <td>{category?.categoryName}</td>
                                                            <td className="mobile-description">{category?.categoryDescription}</td>
                                                        </tr>
                                                    )) : (
                                                        <>
                                                            <div className="text-center mt-3">
                                                                <h2>No Categories</h2>
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

        <div class="modal fade" id="AddCategoryModal" tabindex="-1" aria-labelledby="AddCategoryModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="AddCategoryModalLabel">Add Category</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        {isCategoryLoading && <div className="" style={{ textAlign: 'center' }}><Loading /> </div>}
                        {error && <div className="alert alert-danger text-center">{error}</div>}
                        {success && <div className="alert alert-success text-center">{success}</div>}

                        <form>
                            <div className="mb-4 form-group">
                                <label className="form-label">Category</label>
                                <input
                                    type="text"
                                    value={categoryName}
                                    onChange={e => setCategoryName(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-4 form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    type="text"
                                    rows={3}
                                    value={categoryDescription}
                                    onChange={e => setCategoryDescription(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button onClick={submitHandler} type="button" class="btn btn-success">Add</button>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default ViewCategories;