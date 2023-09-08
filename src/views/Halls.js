import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "../axios/axios";

const Halls = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function getHalls() {
            try {
                setLoading(true);

                const { data } = await axios.get("halls/all",
                    {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        }
                    });

                if (data) {
                    setLoading(false);
                }
                setHalls(data);
            }

            catch (error) {
                if (error.response.status === 401) {
                    setLoading(false);

                    window.alert("Your session has expired. Login again!");
                    localStorage.removeItem("user");

                    navigate("/admin-login");
                }
                else {
                    setLoading(false);

                    window.alert(error.response.data);
                    console.error(error.response.data);
                }
            }

        }

        getHalls();
    }, [setHalls]);

    return <>
        {loading ? <div className="mt-5" style={{ textAlign: 'center' }}><Loading /> </div> :

            <div className="container ms-auto me-auto mt-3">
                <div className="d-flex justify-content-between mt-4">
                    <div></div>
                    <h1 className="text-center">Halls</h1>
                    <Link to="/create-hall"><button className="btn btn-success me-2">Create Hall</button></Link>
                </div>

                <hr />

                <div className="row">

                    {halls.length > 0 ? (
                        halls.map(hall => {

                            return <div className="col-md-4 d-flex justify-content-around">

                                <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem", borderRadius: "5%" }}>
                                    <div className="card-body text-center fs-5">
                                        <h3 className="card-title">{hall.hallName}</h3>
                                        <hr />
                                        <p>{hall.hallShortCode}</p>
                                    </div>
                                </div>
                            </div>
                        })

                    ) : (

                        <div className="text-center mt-5">
                            <h2>No halls</h2>
                        </div>

                    )}

                </div>
            </div>
        }
    </>
}

export default Halls;