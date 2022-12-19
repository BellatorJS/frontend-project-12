import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { FloatingLabel } from 'react-bootstrap';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth';
import { useState, useRef, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import {postlogin} from '../feachers/channels-slice'
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const Footer = () =>{
  return (
    <Card className="text-center p-4">
      <Card.Footer >
        <span>Нет аккаунта?</span>{' '}
      <Link to={"/signup"}>Регистрация</Link>
       </Card.Footer>
    </Card>
  );

}

const LoginForm = ()=> {

  const { user, logIn, logOut } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
  initialValues: {
    username: '',
    password: '',
  },
  onSubmit: async (values) => {
    setAuthFailed(false);
    try {
      const res = await axios.post(['/api/v1/', 'login'].join('/'), values);
      const data = await res.data;
      logIn(data);
      console.log(location.state )
      const { from } = location.state || { from: { pathname: '/' } };  
      navigate(from);
    } catch (err) {
      console.log(err)
      formik.setSubmitting(false);
        setAuthFailed(true);
        inputRef.current.select();
   
    }
  },
});

return (
  <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit} >
  <fieldset disabled={formik.isSubmitting}>
    <Form.Group>
      <Form.Label htmlFor="username"></Form.Label>
        <FloatingLabel
          controlId="username"
          label="Ваш ник"
          className="mb-3"
          >
      <Form.Control
        onChange={formik.handleChange}
        value={formik.values.username}
        placeholder="username"
        name="username"
        autoComplete="username"
        isInvalid={authFailed}
        required
        ref={inputRef}
      />
      </FloatingLabel>
    </Form.Group>
    <Form.Group>
      <Form.Label htmlFor="password"></Form.Label>
      <FloatingLabel
          controlId="password"
          label="Пароль"
          className="mb-3"
        >
      <Form.Control
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        placeholder="password"
        name="password"
        autoComplete="current-password"
        isInvalid={authFailed}
        required
      />
        <Form.Control.Feedback type="invalid" tooltip>
        Неверные имя пользователя или пароль
        </Form.Control.Feedback>
      </FloatingLabel>
    
    </Form.Group>
    <Button type="submit" variant="outline-primary">Submit</Button>
  </fieldset>
  </Form>
)
}







export const LoginPage = () => {

    return (
      <>
      <div class="d-flex flex-column h-100">
          <div class="container-fluid h-100">
            <div class="row justify-content-center align-content-center h-100">
              <div class="col-12 col-md-8 col-xxl-6">
                  <div class="card shadow-sm">
                    <div class="card-body row p-5">
                    <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img src="https://lastfm.freetls.fastly.net/i/u/ar0/3972fec593824dffcdcf2310a6879198.png" class="rounded-circle" alt="Войти"/>

                    </div>
                    <LoginForm />
                    <Footer />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
</>
  )}


