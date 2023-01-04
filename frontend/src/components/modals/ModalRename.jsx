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
import { onHide } from '../../slices/modals-slice';
import useModals from './useModals';

const ModalRename = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { renameChannel } = useApi();
  const {
    uniqueNames, inputRef, id, channel, online,
  } = useModals();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    if (!online) {
      toast.error(t('socketsStatus.connectError'));
    }
  }, [online, t]);
  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .notOneOf(uniqueNames, t('modalRename.uniqueName'))
      .trim()
      .required(t('modalRename.requiredField'))
      .min(3, t('modalRename.channelLength'))
      .max(20, t('modalRename.channelLength')),
  });
  const handleResponseStatus = ({ status }) => {
    if (status === 'ok') {
      console.log(t('socketsStatus.success'));
      toast.success(t('modalRename.renameCompleted'));
    } else {
      console.log(t('socketsStatus.connectError'));
    }
  };
  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema,
    onSubmit: ({ name }) => {
      const filteredName = dictionaryFilter.clean(name);
      if (!online) {
        toast.error(t('socketsStatus.connectError'));
      } else {
        renameChannel({ id, name: filteredName }, handleResponseStatus);
      }
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
          <fieldset disabled={formik.isSubmitting || !online}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                ref={inputRef}
                onChange={formik.handleChange}
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
