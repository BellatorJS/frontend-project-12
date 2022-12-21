import React, { useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelsSelectors } from '../../feachers/channels-slice';
import { useSocket } from '../../hooks/useSockect';

const ModalAdd = (props) => {
  const { t } = useTranslation();
  const { onHide } = props;
  const inputRef = useRef();
  const useSockets = useSocket();
  const channelsNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);
  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .trim()
      .min(3, t('modalAdd.channelLength'))
      .max(20, t('modalAdd.channelLength'))
      .notOneOf(channelsNames)
      .required(t('modalAdd.requiredField')),

  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const channel = { name: values.name };
      useSockets.dispatchingSockets.addChanel(channel);
      formik.resetForm();
      onHide();
    },
  });
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modalAdd.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="visually-hidden" htmlFor="name">{t('modalAdd.name')}</Form.Label>
            <Form.Control
              type="text"
              ref={inputRef}
              placeholder="Введите имя канала"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              isInvalid={formik.errors.name && formik.touched.name}
              disabled={formik.isSubmitting}
            />
            {' '}
            <Form.Control.Feedback type="is-invalid">{formik.errors.name }</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={onHide}
            >
              {t('modalAdd.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              {t('modalAdd.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAdd;
