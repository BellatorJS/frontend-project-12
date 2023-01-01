import { Button, Link } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import routes from '../routes/routes';
// eslint-disable-next-line import/prefer-default-export
export const AuthButton = () => {
  const { loggedIn, logOut } = useAuth();
  const location = useLocation();

  return (
    loggedIn
      ? <Button onClick={logOut}>Log out</Button>
      : <Button as={Link} path={routes.loginPage()} state={{ from: location }}>Log in</Button>
  );
};
