import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import routes from '../routes/routes';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  return (
    user
      ? children
      : <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
};
export default PrivateRoute;
