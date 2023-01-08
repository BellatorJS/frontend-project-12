import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Col, Card, Container, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import login from '../assets/login.jpg';
import routes from '../routes/routes';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Card className="text-center p-4">
      <Card.Footer>
        <span>{t('footer.notHaveAnAccountYet')}</span>
        {' '}
        <Link to="/signup">{t('footer.signup')}</Link>
      </Card.Footer>
    </Card>
  );
};

const LoginForm = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
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
        const res = await axios.post(routes.loginPath(), values);
        const data = await res.data;
        logIn(data);
        navigate(routes.homePage());
      } catch (error) {
        const { message, response } = error;
        if (message === 'Network Error') {
          toast.error(t('loginErrors.network'));
        }
        if (response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        } else {
          toast.error(t('loginErrors.unknown'));
          throw error;
        }
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('login.enter')}</h1>
      <fieldset disabled={formik.isSubmitting}>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
            id="username"
            autoComplete="username"
            isInvalid={authFailed}
            required
            ref={inputRef}
          />
          <Form.Label htmlFor="username">{t('login.nickname')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4">
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            isInvalid={authFailed}
            name="password"
            autoComplete="current-password"
            type="password"
            required
          />
          <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            {t('login.authFailed')}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="w-100 mb-4" variant="outline-primary">{t('login.submit')}</Button>
      </fieldset>
    </Form>
  );
};

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} xs={12}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} xs={12} className="d-flex align-items-center justify-content-center">
                <img
                  src={login}
                  className="rounded-circle"
                  alt={t('login.loginImage')}
                />
              </Col>
              <LoginForm />
              <Footer />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
