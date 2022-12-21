import { Button, Link } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};
