import React from 'react';
import {
  Button, Navbar, Container, Nav,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const ChatHeader = () => {
  const { t } = useTranslation();
  const { logOut, user } = useAuth();
  console.log(user);
  return (
    <Navbar expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand>
          <Nav.Link href="/">{t('navbar.chatName')}</Nav.Link>
        </Navbar.Brand>
        {user && <Button onClick={logOut}>{t('navbar.logout')}</Button>}
      </Container>

    </Navbar>
  );
};

export default ChatHeader;
