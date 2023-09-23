import { Link } from "react-router-dom";
import "./Account.css"

const ChangeUsername = () => {
    return <>
        <ul class="nav nav-tabs mt-3 d-flex justify-content-evenly p-3" id="myTab" role="tablist">
        <Link to="/change-names">
                <li className="nav-item" role="presentation">
                    <p className="nav-link text-light" id="names-tab" data-bs-toggle="tab" data-bs-target="#names-tab-pane" type="button" role="tab" aria-controls="names-tab-pane" aria-selected="true"> Names </p>
                </li>
            </Link>

            <Link to="/change-username">
                <li className="nav-item" role="presentation">
                    <p className="nav-link active text-light" id="username-tab" data-bs-toggle="tab" data-bs-target="#username-tab-pane" type="button" role="tab" aria-controls="username-tab-pane" aria-selected="false"> Username </p>
                </li>
            </Link>

            <Link to="/change-email">
                <li className="nav-item" role="presentation">
                    <p className="nav-link text-light" id="email-tab" data-bs-toggle="tab" data-bs-target="#email-tab-pane" type="button" role="tab" aria-controls="email-tab-pane" aria-selected="false"> Email </p>
                </li>
            </Link>

            <Link to="/change-password">
                <li className="nav-item" role="presentation">
                    <p className="nav-link text-light" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" type="button" role="tab" aria-controls="password-tab-pane" aria-selected="false">Password </p>
                </li>
            </Link>

            <Link to="/two-factor-authentication">
                <li className="nav-item" role="presentation">
                    <p className="nav-link text-light" id="2fa-tab" data-bs-toggle="tab" data-bs-target="#2fa-tab-pane" type="button" role="tab" aria-controls="2fa-tab-pane" aria-selected="false">Two Factor</p>
                </li>
            </Link>

            <Link to="/profile-picture">
                <li className="nav-item" role="presentation">
                    <p className="nav-link text-light" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</p>
                </li>
            </Link>
        </ul >
    </>
}

export default ChangeUsername;