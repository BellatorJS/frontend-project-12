import React from 'react';

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import {channelsSelectors,channelAdded} from '../../feachers/channels-slice'
import {useSocket} from '../../hooks/useSockect'
import { useRef, useEffect } from 'react';


export const ModalRemove = (props) => {

    const {onHide} = props;
    const useSockets = useSocket()
    const channelsNames = useSelector(channelsSelectors.selectAll).map(channel=>channel.name)

     
      useEffect(() => {
      
      }, []);
      /*  const formik = useFormik({
            initialValues: {
              name: '',
            },
          
    
            onSubmit: values => {
            const channel ={name:values.name};
            useSockets.dispatchingSockets.addChanel(channel)
            formik.resetForm()
            onHide()
            },
          });*/
    

  return (
    <>
    <Modal show 
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      Уверены?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="danger">Удалить</Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}
