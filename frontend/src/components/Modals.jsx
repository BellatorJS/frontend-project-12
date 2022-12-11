import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';

import { useDispatch, useSelector } from "react-redux";
import {channelsSelectors,channelAdded} from '../feachers/channels-slice'

export const Modals = (props) => {
  const dispatch =useDispatch()
  const channelsNames = useSelector(channelsSelectors.selectAll).map(channel=>channel.name)

  const [channelNameFailed, setchannelNameFailed] = useState(false);

  
 // console.log(channelsNames)
    const {show, onHide:handleClose} = props;

    const formik = useFormik({
        initialValues: {
          name: '',

        },
        onSubmit: values => {
          console.log(values.name)
         const isValidName= channelsNames.some((channelName)=>channelName===values.name)
         console.log(isValidName)
         setchannelNameFailed(isValidName)
         dispatch(channelAdded({ name: values.name }))
          
        },
      });


  return (
    <>
  

      <Modal {...props} >
        <Modal.Header closeButton >
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя канала"
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                name="name"
                isInvalid={channelNameFailed}
              />
              <div className="invalid-feedback">Должно быть уникальным</div>
            </Form.Group>
            <div className="d-flex justify-content-between">
         <Button 
          variant="secondary" 
          onClick={handleClose}>
            Отменить
          </Button>
          <Button 
          variant="primary" 
          type="submit"
          >
            Отправить
          </Button>

                </div>
          </Form>
        </Modal.Body>

      </Modal>
    </>
  );



}























