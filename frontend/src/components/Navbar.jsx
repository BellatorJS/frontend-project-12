
import React from 'react';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';


import  useAuth  from '../hooks/useAuth';

export const Navbar1 = () => {
  const { logOut, user } = useAuth();
  console.log(user)
  return (
    <Navbar expand="lg" variant="light" bg="white">
      <Container>
      <Navbar.Brand>
      <Nav.Link href="/">Hexlet chat</Nav.Link>
       </Navbar.Brand>
        </Container>
        {user && <Button onClick={logOut}>Выйти</Button>}
   
    </Navbar>
  );
};

export default Navbar1;

