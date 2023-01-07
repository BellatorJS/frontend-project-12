import { toast } from 'react-toastify';
import dictionaryFilter from 'leo-profanity';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi';
import { onHide } from '../../slices/modals-slice';
import useModals from './useModals';
import { setChannel } from '../../slices/channels-slice';

const ModalAdd = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { addChanel } = useApi();
  const { uniqueNames, inputRef, online } = useModals();

  const handleResponseStatus = ({ status, data }) => {
    if (status === 'ok') {
      console.log(data.id);
      console.log(t('socketsStatus.success'));
      toast.success(t('modalAdd.channelCreated'));
      dispatch(setChannel(data.id));
    } else {
      console.log(t('socketsStatus.connectError'));
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .trim()
      .min(3, t('modalAdd.channelLength'))
      .max(20, t('modalAdd.channelLength'))
      .notOneOf(uniqueNames, t('modalAdd.uniqueName'))
      .required(t('modalAdd.requiredField')),

  });

  useEffect(() => {
    if (!online) {
      toast.error(t('socketsStatus.connectError'));
    }
  }, [online, t]);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: ({ name }) => {
      const filteredName = dictionaryFilter.clean(name);
      const channel = { name: filteredName };
      if (!online) {
        toast.error(t('socketsStatus.connectError'));
      } else {
        addChanel(channel, handleResponseStatus);
      }
      formik.resetForm();
      dispatch(onHide());
    },
  });
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(onHide())}>
        <Modal.Title>{t('modalAdd.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting || !online}>
            <Form.Group className="mb-3">
              <Form.Control
                id="name"
                name="name"
                ref={inputRef}
                onChange={formik.handleChange}
                value={formik.values.name}
                isInvalid={formik.errors.name && formik.touched.name}
              />
              <Form.Label className="visually-hidden" htmlFor="name">{t('modalAdd.name')}</Form.Label>
              <Form.Control.Feedback type="invalid">{formik.errors.name }</Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => dispatch(onHide())}
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
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAdd;
