import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import * as Yup from 'yup';
import { FloatingLabel } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { Formik } from 'formik';
import Card from 'react-bootstrap/Card';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const SignUpForm = () => {
  const { t } = useTranslation();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup
      .string()
      .required(t('signup.requiredField'))
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: Yup
      .string()
      .required(t('signup.requiredField'))
      .min(6, t('signup.minPassLength')),
    confirmPassword: Yup
      .string()
      .required(t('signup.requiredField'))
      .oneOf([Yup.ref('password')], t('signup.mustMatch')),
  });

  const { logIn } = useAuth();

  const [registrationFailed, setRegistrationFailed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setRegistrationFailed(false);
        const { username, password } = values;
        try {
          const res = await axios.post(['/api/v1/', 'signup'].join('/'), {
            username,
            password,
          });
          const data = await res.data;
          logIn(data);
          const { from } = location.state || { from: { pathname: '/' } };
          navigate(from);
        } catch (err) {
          if (err.response.status === 409) {
            setRegistrationFailed(true);
          } else {
            console.error(err);
          }
        }
      }}

    >
      {({

        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <Form
          className="w-50"
          onSubmit={handleSubmit}
        >
          <Form.Group className=" form-floating mb-5 position-relative ">
            <h1 className="text-center mb-3">{t('signup.registration')}</h1>
            <Form.Label
              htmlFor="username"
            />
            <FloatingLabel
              controlId="username"
              label={t('signup.username')}
            >
              <Form.Control
                name="username"
                isInvalid={(touched.username && errors.username) || registrationFailed}
                required
                onChange={handleChange}
                ref={inputRef}
                onBlur={handleBlur}
                value={values.username}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.username}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className=" form-floating mb-5 position-relative">
            <Form.Label htmlFor="password" />
            <FloatingLabel
              controlId="password"
              label={t('signup.password')}
            >
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                isInvalid={(touched.password && errors.password) || registrationFailed}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>

          </Form.Group>
          <Form.Group className="form-floating mb-5 position-relative">
            <Form.Label htmlFor="confirmPassword" />
            <FloatingLabel
              controlId="confirmPassword"
              label={t('signup.confirmPassword')}
            >
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={values.confirmPassword}
                onBlur={handleBlur}
                isInvalid={(touched.confirmPassword
                  && errors.confirmPassword)
                  || registrationFailed}
                required
              />
              {registrationFailed && (
              <Form.Control.Feedback type="invalid" tooltip>
                {t('signup.isExists')}
              </Form.Control.Feedback>
              )}

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Button type="submit" class="w-100 btn btn-outline-primary mb-5 ">
            {t('signup.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
const SignUp = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row
              justify-content-around align-items-center p-5"
          >
            <div>
              <img src="https://lastfm.freetls.fastly.net/i/u/ar0/3972fec593824dffcdcf2310a6879198.png" className="rounded-circle" alt="Регистрация" />
            </div>
            <SignUpForm />
            <div />
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
);

export default SignUp;
