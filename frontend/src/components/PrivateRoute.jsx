import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export const PrivateRoute = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
  
    return (
      auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
    );
  };
  