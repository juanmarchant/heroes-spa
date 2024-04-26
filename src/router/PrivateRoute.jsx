import { useContext } from "react"
import { Navigate } from "react-router-dom";

import { AuthContext } from "../auth"

export const PrivateRoute = ({ children }) => {

    const { logged } = useContext(AuthContext);

    const lastPath = pathname + search;
    localStorage.setItem('lastpath', lastPath);

    return (logged)
        ? children
        : <Navigate to="/login" />
}
