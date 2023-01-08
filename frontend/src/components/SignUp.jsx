import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import * as Yup from 'yup';
import { Row, Container, Col } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
      .trim()
      .required(t('signup.requiredField'))
      .min(3, t('signup.usernameLength'))
      .max(20, t('signup.usernameLength')),
    password: Yup
      .string()
      .trim()
      .required(t('signup.requiredField'))
      .min(6, t('signup.minPassLength')),
    confirmPassword: Yup
      .string()
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
    validateOnBlur: false,
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      try {
        const res = await axios.post(routes.signupPath(), values);
        const data = await res.data;
        logIn(data);
        navigate(routes.homePage());
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          setRegistrationFailed(true);
        } else {
          toast.error(t('signupError.connectError'));
          throw error;
        }
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
            autoComplete="username"
            id="username"
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
          <Form.Control.Feedback type="invalid" tooltip placement="right">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className=" form-floating mb-5 position-relative">
          <Form.Control
            id="password"
            type="password"
            name="password"
            autoComplete="new-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={(formik.touched.password && formik.errors.password) || registrationFailed}
            placeholder={t('signup.password')}
            required
          />
          <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip placement="right">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-floating mb-5 position-relative">
          <Form.Control
            id="confirmPassword"
            placeholder={t('signup.confirmPassword')}
            type="password"
            autoComplete="new-password"
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
          <Form.Control.Feedback type="invalid" tooltip>
            {
            (registrationFailed)
              ? t('signup.isExists')
              : formik.errors.confirmPassword
}
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
    <Container fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} xs={12}>
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
        </Col>
      </Row>

    </Container>
  );
};

export default SignUp;
