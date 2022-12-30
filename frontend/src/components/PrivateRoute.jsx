import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  return (
    (user) ? children : <Navigate to="/login" state={{ from: location }} />
  );
};
export default PrivateRoute;
