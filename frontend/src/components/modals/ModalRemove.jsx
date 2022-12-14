import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useSocket} from '../../hooks/useSockect'

export const ModalRemove = (props) => {
   const {onHide, id} = props;


const useSockets = useSocket()
  
const handleSubmit =()=>{

  useSockets.dispatchingSockets.removeChannel({id});
onHide()
}



  return (
    <>
      <Modal show >
        <Modal.Header closeButton onHide={onHide} >
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body > Уверены?
        <Modal.Footer >
          <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button onClick={handleSubmit}
        variant="danger"
        type='submit'
        >
          Удалить
          </Button>
        </div>
      </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
