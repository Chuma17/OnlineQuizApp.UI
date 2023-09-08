import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const location = useLocation();

    return (
        allowedRoles.find((role) => user?.role?.includes(role))
            ? <Outlet />
            : user?.userName
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;