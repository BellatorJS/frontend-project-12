import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { FloatingLabel } from 'react-bootstrap';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth';
import { useState, useRef, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from "react-redux";
import {postlogin} from '../feachers/dataSlice'

export const LoginPage = () => {
  const dispatch = useDispatch();

 /*const validation = ({username, password}) => {
      const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
      });
      return schema.validate({username, password});
    };*/


    const auth = useAuth();
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
        console.log(values)
        dispatch(postlogin(values))
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
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
    </FloatingLabel>
    <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
  </Form.Group>
  <Button type="submit" variant="outline-primary">Submit</Button>
</fieldset>
</Form>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                                 
                           
                                
          

</>
  
  )}

  
/*
<Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit} className="p-3">
            <fieldset disabled={formik.isSubmitting}>
              <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="username"
                  name="username"
                  id="username"
                  autoComplete="username"
                  isInvalid={authFailed}
                  required
                  ref={inputRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  isInvalid={authFailed}
                  required
                />
                <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-primary">Submit</Button>
            </fieldset>
          </Form>
*/





/*
<Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit} >
<fieldset disabled={formik.isSubmitting}>
  <Form.Group>
    <Form.Label htmlFor="username">Username</Form.Label>
    <Form.Control
      onChange={formik.handleChange}
      value={formik.values.username}
      placeholder="username"
      name="username"
      id="username"
      autoComplete="username"
      isInvalid={authFailed}
      required
      ref={inputRef}
    />
  </Form.Group>
  <Form.Group>
    <Form.Label htmlFor="password">Password</Form.Label>
    <Form.Control
      type="password"
      onChange={formik.handleChange}
      value={formik.values.password}
      placeholder="password"
      name="password"
      id="password"
      autoComplete="current-password"
      isInvalid={authFailed}
      required
    />
    <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
  </Form.Group>
  <Button type="submit" variant="outline-primary">Submit</Button>
</fieldset>
</Form>*/



