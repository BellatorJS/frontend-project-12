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

export const RegistrationPage = () => {


  const dispatch = useDispatch();
     const auth = useAuth();
     const [authFailed, setAuthFailed] = useState(false);
     const inputRef = useRef();
     const location = useLocation();
     const navigate = useNavigate();
 
     useEffect(() => {
       inputRef.current.focus();
     }, []);

     return (
      <div class="container-fluid h-100">
        <div class="row justify-content-center align-content-center h-100">
          <div class="col-12 col-md-8 col-xxl-6">
            <div class="card shadow-sm">
              <div class="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5"><div>
               <img src="https://lastfm.freetls.fastly.net/i/u/ar0/3972fec593824dffcdcf2310a6879198.png"  class="rounded-circle" alt="Регистрация"/>
                  </div>
                  <Form className="w-50" >
                <Form.Group className="form-floating mb-3 position-relative ">
                  <h1 className="text-center mb-4">Регистрация</h1>
                    <Form.Label htmlFor="username"></Form.Label>
                      <FloatingLabel
                        controlId="username"
                        label="Имя пользователя"
                        className="mb-3"
                        >
                    <Form.Control
                        placeholder="username"
                        name="username"
                        autoComplete="username"
                        isInvalid="true"
                        required
                        ref={inputRef}
                        />
                       <div className="invalid-tooltip">
                       Обязательное поле</div>  
                    </FloatingLabel>
        
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="password"></Form.Label>
                    <FloatingLabel
                        controlId="password"
                        label="Пароль"
                        className="mb-3"
                      >
                    <Form.Control
                      type="password"
                      placeholder="password"
                      name="password"
                      autoComplete="current-password"
                      isInvalid={authFailed}
                      required
                    />
                      </FloatingLabel>
    <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="password"></Form.Label>
                    <FloatingLabel
                        controlId="password"
                        label="Подтвердите пароль"
                        className="mb-3"
                      >
                    <Form.Control
                      type="password"
                      placeholder="password"
                      name="password"
                      autoComplete="current-password"
                      isInvalid={authFailed}
                      required
                    />
                      </FloatingLabel>
    <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
                </Form.Group>
             <Button type="submit" class="w-100 btn btn-outline-primary">
                                Зарегистрироваться
                                </Button>
                     </Form>
                                </div>
                                </div>
                                </div>
                                </div>
                                </div>
 
                                 
           

   
   )}
 



