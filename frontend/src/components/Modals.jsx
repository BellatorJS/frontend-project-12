import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import {channelsSelectors,channelAdded} from '../feachers/channels-slice'
import { io } from "socket.io-client";

const socket = io();

export const Modals = (props) => {


const channelsNames = useSelector(channelsSelectors.selectAll).map(channel=>channel.name)

  const validationSchema = Yup.object().shape({
    name: Yup.string().notOneOf(channelsNames),
  });

  const dispatch = useDispatch()

    const {onHide:handleClose} = props;

    const formik = useFormik({
        initialValues: {
          name: '',
        },
        validationSchema,

        onSubmit: values => {
        
       
         socket.emit('newChannel',  {  name: values.name } );
          console.log("LA")
         socket.on('newChannel', (values) => {
            console.log("LA")
            dispatch(channelAdded({  name: values.name }))
            // { id: 6, name: "new channel", removable: true }
          });
          
          


          
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
                isInvalid={formik.errors.name && formik.touched.name}
                disabled={formik.isSubmitting}
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























