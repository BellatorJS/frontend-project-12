import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    (auth.user !== null) ? children : <Navigate to="login" state={{ from: location }} />
  );
};
export default PrivateRoute;
