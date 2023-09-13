// Lógica com redux toolkit

// import { useLocation, Navigate, Outlet } from "react-router-dom"
// import useAuth from "hooks/useAuth"

// const RequireAuth = ({ allowedRoles }) => {
//     const location = useLocation()
//     const { roles } = useAuth()

//     const content = (
//         roles.some(role => allowedRoles.includes(role))
//             ? <Outlet />
//             : <Navigate to="/" state={{ from: location }} replace />
//     )

//     return content
// }
// export default RequireAuth

// import { Navigate, Outlet } from "react-router-dom";
// import AuthContext from "context/authProvider";
// import { useContext } from "react";

// export const PrivateRoute = () => {
//   const { segned } = useContext(AuthContext);

//   return segned ? <Outlet /> : <Navigate to="/" />;
// };

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.username
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;
