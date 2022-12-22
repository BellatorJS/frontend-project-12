import { toast } from 'react-toastify';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import useSocket from '../../hooks/useSockect';

const ModalRemove = (props) => {
  const { onHide, id } = props;

  const useSockets = useSocket();
  const { t } = useTranslation();

  const handleSubmit = () => {
    useSockets.dispatchingSockets.removeChannel({ id });
    toast.success(t('modalRemove.removeCompleted'));
    onHide();
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modalRemove.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {' '}
        {t('modalRemove.confirm')}
        <Modal.Footer>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={onHide}>
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
    </Modal>
  );
};

export default ModalRemove;
