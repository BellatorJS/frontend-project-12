import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import * as Yup from 'yup';
import { Row, Container } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import registration from '../assets/registration.jpg';
import routes from '../routes/routes';

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
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      try {
        const res = await axios.post(routes.signupPath(), values);
        const data = await res.data;
        logIn(data);
        navigate('/');
      } catch (error) {
        setRegistrationFailed(true);
      }
    },

  });

  return (
    <Form
      className="w-50"
      onSubmit={formik.handleSubmit}
    >

      <h1 className="text-center mb-3">{t('signup.registration')}</h1>
      <fieldset disabled={formik.isSubmitting}>
        <Form.Group className=" form-floating mb-5 position-relative ">
          <Form.Control
            placeholder={t('signup.username')}
            name="username"
            isInvalid={(formik.touched.username && formik.errors.username) || registrationFailed}
            required
            onChange={formik.handleChange}
            ref={inputRef}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className=" form-floating mb-5 position-relative">

          <Form.Control
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={(formik.touched.password && formik.errors.password) || registrationFailed}
            placeholder={t('signup.password')}
            required
          />
          <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-floating mb-5 position-relative">
          <Form.Control
            placeholder={t('signup.confirmPassword')}
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            isInvalid={(formik.touched.confirmPassword
            && formik.errors.confirmPassword)
            || registrationFailed}
            required
          />
          <Form.Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Form.Label>
          {registrationFailed && (
          <Form.Control.Feedback type="invalid" tooltip>
            {t('signup.isExists')}
          </Form.Control.Feedback>
          )}
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="w-100 btn-primary">
          {t('signup.submit')}
        </Button>
      </fieldset>
    </Form>

  );
};
const SignUp = () => {
  const { t } = useTranslation();
  return (
    <Container fluid h-100>
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row
              justify-content-around align-items-center p-5"
            >
              <div>
                <img
                  src={registration}
                  className="rounded-circle"
                  alt={t('signup.registrationImg')}
                />
              </div>
              <SignUpForm />
              <div />
            </Card.Body>
          </Card>
        </div>
      </Row>

    </Container>
  );
};

export default SignUp;
