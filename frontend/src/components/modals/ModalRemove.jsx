import { toast } from 'react-toastify';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import useSocket from '../../hooks/useSockect';
import { onHide } from '../../feachers/modals-slice';
import useModals from './useModals';
import { setChannel } from '../../feachers/channels-slice';

const ModalRemove = () => {
  const dispatch = useDispatch();
  const { id } = useModals();
  const useSockets = useSocket();
  const { t } = useTranslation();
  const [removeDisabled, setRemoveDisabled] = useState(false);
  const isSubmitting = () => setRemoveDisabled(!removeDisabled);

  const handleSubmit = () => {
    isSubmitting();
    useSockets.dispatchingSockets.removeChannel({ id });
    toast.success(t('modalRemove.removeCompleted'));
    dispatch(setChannel(1));
    dispatch(onHide());
    isSubmitting();
  };

  return (
    <Modal show centered>
      <fieldset disabled={removeDisabled}>
        <Modal.Header closeButton onHide={() => dispatch(onHide())}>
          <Modal.Title>{t('modalRemove.removeChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          {t('modalRemove.confirm')}
          <Modal.Footer>
            <div className="d-flex justify-content-end">
              <Button
                className="mx-2"
                variant="secondary"
                onClick={() => dispatch(onHide())}
              >
                {t('modalRemove.cancel')}
              </Button>
              <Button
                onClick={handleSubmit}
                variant="danger"
                type="submit"
              >
                {t('modalRemove.remove')}
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Body>
      </fieldset>
    </Modal>
  );
};

export default ModalRemove;
