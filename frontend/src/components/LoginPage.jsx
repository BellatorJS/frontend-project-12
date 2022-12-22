import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { FloatingLabel } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

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
        const res = await axios.post(['/api/v1/', 'login'].join('/'), values);
        const data = await res.data;
        logIn(data);
        navigate('/');
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
        <Form.Group>
          <Form.Label htmlFor="username" />
          <FloatingLabel
            controlId="username"
            label={t('login.nickname')}
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
          <Form.Label htmlFor="password" />
          <FloatingLabel
            controlId="password"
            label={t('login.password')}
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
              {t('login.authFailed')}
            </Form.Control.Feedback>
          </FloatingLabel>

        </Form.Group>
        <Button type="submit" variant="outline-primary">{t('login.submit')}</Button>
      </fieldset>
    </Form>
  );
};

const LoginPage = () => (
  <div className="d-flex flex-column h-100">
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="https://lastfm.freetls.fastly.net/i/u/ar0/3972fec593824dffcdcf2310a6879198.png" className="rounded-circle" alt="Войти" />

              </div>
              <LoginForm />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
