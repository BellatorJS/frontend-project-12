import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import dictionaryFilter from 'leo-profanity';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi';
import { onHide } from '../../feachers/modals-slice';
import useModals from './useModals';

const ModalRename = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const useSockets = useApi();
  const {
    uniqueNames, inputRef, id, channel,
  } = useModals();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .notOneOf(uniqueNames, t('modalRename.uniqueName'))
      .trim()
      .required(t('modalRename.requiredField'))
      .min(3, t('modalRename.channelLength'))
      .max(20, t('modalRename.channelLength')),
  });

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema,
    onSubmit: (values) => {
      const filteredName = dictionaryFilter.clean(values.name);
      useSockets.renameChannel({ id, name: filteredName });
      toast.success(t('modalRename.renameCompleted'));
      formik.resetForm();
      dispatch(onHide());
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(onHide())}>
        <Modal.Title>{t('modalRename.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
              // type="text"
                ref={inputRef}
              // placeholder="Введите имя канала"
                onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
                value={formik.values.name}
                id="name"
                name="name"
                isInvalid={formik.errors.name && formik.touched.name}
              />
              <Form.Label className="visually-hidden" htmlFor="name">{t('modalRename.name')}</Form.Label>
              <Form.Control.Feedback type="is-invalid">{formik.errors.name}</Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => dispatch(onHide())}
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
          </fieldset>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default ModalRename;
