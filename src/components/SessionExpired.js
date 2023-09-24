import { useState } from 'react';

const SessionExpired = () => {
    const [showModal, setShowModal] = useState(true);

    const closeModal = () => {
        setShowModal(false);
    }

    return showModal && (
        <>
            <div className="modal fade" id="sessionExpiredModal" tabindex="-1" aria-labelledby="sessionExpiredModalLabel" aria-hidden="true">
                <div className="modal-dialog text-light">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-light" id="sessionExpiredModalLabel">Session Expired</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-light">
                            Your session has expired. You need to login!
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger text-light" data-bs-dismiss="modal" onClick={closeModal}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SessionExpired;