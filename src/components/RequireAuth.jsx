import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {

    const user = JSON.parse(localStorage.getItem('userDetails'));
    const location = useLocation();    

    const isAuthorized = allowedRoles.find((role) => user?.roles?.includes(role));

    return (
        isAuthorized
            ? <Outlet />
            : user?.userName
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;