import { Link } from "react-router-dom"

const Missing = () => {
    return <>

        <div className="missing">
            <article style={{ padding: "100px"}}>
                <h1 className="text-light">Oops!</h1>
                <p className="text-light">Page Not Found</p>
                <div className="flexGrow">
                    <Link className="text-light" to="/">Visit Our Homepage</Link>
                </div>
            </article>
        </div>
    </>
}

export default Missing