import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import * as Yup from 'yup';
import { FloatingLabel } from 'react-bootstrap';
import React from 'react';
import { Formik } from 'formik';
import { createNewUser } from '../feachers/channels-slice';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';



const validationSchema =  Yup.object().shape({
  username: Yup
    .string()
    .required('Обязательное поле')
    .min(3,"От 3 до 20 символов" )
    .max(20,"От 3 до 20 символов" ),
  password: Yup
    .string()
    .required('Обязательное поле')
    .min(6,'Не менее 6 символов'),
  confirmPassword: Yup
    .string()
    .required('Обязательное поле')
    .oneOf([Yup.ref('password')],"Пароли должны совпадать"),
})
const SignUpForm=()=> {
  const {error, loading} = useSelector(state => state.channels);
 
  const dispatch = useDispatch()
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const { username, password } = values;
        const data = {username, password};
        dispatch(createNewUser(data))
   
      }}
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
    >
      {({
   
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form 
          className="w-50"
          onSubmit={handleSubmit} >
          <Form.Group className=" form-floating mb-5 position-relative ">
                  <h1 className="text-center mb-3">Регистрация</h1>
                    <Form.Label
                    // placeholder={errors.username} 
                     htmlFor="username">
                     </Form.Label>
                      <FloatingLabel
                        controlId="username"
                        label="Имя пользователя"
                      // placeholder={errors.username}
                        >
                    <Form.Control 
                      // placeholder={errors.username}
                        name="username"
                      // autoComplete="username"
                        isInvalid={touched.username && errors.username}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        
                       // ref={inputRef}
                        />
                   <Form.Control.Feedback type="invalid" tooltip>
                      {errors.username}
                </Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group  >
                <Form.Group className=" form-floating mb-5 position-relative">
                  <Form.Label
                   //placeholder={errors.password} 
                   htmlFor="password"></Form.Label>
                    <FloatingLabel
                        controlId="password"
                        label="Пароль"
                        //placeholder={errors.password}
                      >
                    <Form.Control
                      type="password"
                     // placeholder="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                     // autoComplete="current-password"
                      isInvalid={touched.password && errors.password}
                      required
                    />
                <Form.Control.Feedback type="invalid" tooltip>
                                   {errors.password}
                </Form.Control.Feedback>
                      </FloatingLabel>
    
               
                </Form.Group>
                <Form.Group className="form-floating mb-5 position-relative">
                  <Form.Label 
                 // placeholder={errors.confirmPassword} 
                  htmlFor="confirmPassword"></Form.Label>
                    <FloatingLabel
                        controlId="confirmPassword"
                        label="Подтвердите пароль"
                      // placeholder={errors.confirmPassword}
                        
                      >
                    <Form.Control
                      type="password"
                    // placeholder={errors.confirmPassword}
                     // placeholder="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={values.confirmPassword}
                      onBlur={handleBlur}
                     // autoComplete="current-password"
                      isInvalid={(touched.confirmPassword && errors.confirmPassword) || error}
                      required
                    />
                    {console.log(error,'100')}
            {error && <Form.Control.Feedback type="invalid" tooltip>
                   {error}
                </Form.Control.Feedback>}
                   
                
                  <Form.Control.Feedback type="invalid" tooltip>
                   {errors.confirmPassword}
                </Form.Control.Feedback>   



                      </FloatingLabel>


        
                </Form.Group>
             <Button type="submit" class="w-100 btn btn-outline-primary mb-5 ">
                                Зарегистрироваться
                                </Button>
                     </Form>
        
      )}
    </Formik>
  );
}
export const SignUp = () => {

     return (
      <div class="container-fluid h-100">
        <div class="row justify-content-center align-content-center h-100">
          <div class="col-12 col-md-8 col-xxl-6">
           
            <Card className='shadow-sm'>        
              <Card.Body className="d-flex flex-column flex-md-row 
              justify-content-around align-items-center p-5">
                
               <div>
               <img src="https://lastfm.freetls.fastly.net/i/u/ar0/3972fec593824dffcdcf2310a6879198.png"  class="rounded-circle" alt="Регистрация"/>
                  </div>
<SignUpForm />

                 <div>  
                  </div>
                  </Card.Body>
                  </Card>










                  </div>

                  </div>

                  </div>
 
     )
     }