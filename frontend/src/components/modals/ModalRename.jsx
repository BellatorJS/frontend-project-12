import { toast } from 'react-toastify';
import React, { useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import leoProfanity from 'leo-profanity';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelsSelectors } from '../../feachers/channels-slice';
import useSocket from '../../hooks/useSockect';

const ModalRename = (props) => {
  const { t } = useTranslation();
  const { onHide, id } = props;
  const useSockets = useSocket();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelsNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .notOneOf(channelsNames, t('modalRename.uniqueName'))
      .trim()
      .required(t('modalRename.requiredField'))
      .min(3, t('modalRename.channelLength'))
      .max(20, t('modalRename.channelLength')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const filteredName = leoProfanity.clean(values.name);
      useSockets.dispatchingSockets.renameChannel({ id, name: filteredName });
      toast.success(t('modalRename.renameCompleted'));
      formik.resetForm();
      onHide();
    },
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modalRename.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              ref={inputRef}
              placeholder="Введите имя канала"
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              value={formik.values.name}
              id="name"
              name="name"
              isInvalid={formik.errors.name && formik.touched.name}
             // disabled={formik.isSubmitting}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('modalRename.name')}</Form.Label>
            <Form.Control.Feedback type="is-invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={onHide}
            >
              {t('modalRename.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              {t('modalRename.send')}
            </Button>

          </div>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default ModalRename;
