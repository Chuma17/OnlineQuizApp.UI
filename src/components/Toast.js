const Toast = () => {    
    return <>
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="..." class="rounded me-2" alt="..."/>
                    <strong class="me-auto">Online Quiz</strong>
                    <small class="text-body-secondary">11 mins ago</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Coming soon...
            </div>
        </div>
    </>
}

export default Toast;