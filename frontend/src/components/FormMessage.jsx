import React, { useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { nanoid } from '@reduxjs/toolkit';

import leoProfanity from 'leo-profanity';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import useSocket from '../hooks/useSockect';
import { channelIdSelector } from '../feachers/channels-slice';
import 'react-toastify/dist/ReactToastify.css';

const FormMessage = () => {
  const id = useSelector(channelIdSelector);
  const { t } = useTranslation();
  const user = JSON.parse(window.localStorage.getItem('user'));
  const { username } = user;
  const inputRef = useRef();
  const useSockets = useSocket();

  const validationSchema = Yup.object().shape({
    message: Yup
      .string()
      .trim()
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const filteredMsg = leoProfanity.clean(values.message);
      const newMessage = {
        id: nanoid(),
        body: filteredMsg,
        channelId: id,
        username,

      };
      useSockets.dispatchingSockets.addMessage(newMessage);
      resetForm();
      inputRef.current.focus();
    },
  });
  // novalidate=""
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <fieldset disabled={formik.isSubmitting}>
          <InputGroup htmlFor="form" className="input-group has-validation">
            <Form.Control
              ref={inputRef}
              id="form"
              placeholder="Введите сообщение..."
              aria-label="Новое сообщение"
              className="border-0 p-0 ps-2 form-control"
              value={formik.values.message}
              onChange={formik.handleChange}
              name="message"
            />
            <Button
              type="submit"
              fixed-bottom
              disabled={!(formik.isValid && formik.dirty)}
              className="btn btn-group-vertical"
            >
              <ArrowRightSquare />
              <span className="visually-hidden">{t('messages.send')}</span>
            </Button>
          </InputGroup>
        </fieldset>
      </Form>
    </div>
  );
};

export default FormMessage;
