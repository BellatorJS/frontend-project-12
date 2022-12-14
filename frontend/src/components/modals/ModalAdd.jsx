
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import {channelsSelectors,channelAdded} from '../../feachers/channels-slice'
import {useSocket} from '../../hooks/useSockect'
import { useRef, useEffect } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



export const ModalAdd = (props) => {
   const {onHide} = props;

  console.log("FFFFFFFFFFFFFFFFFFFFFFFF")
const useSockets = useSocket()
  

const channelsNames = useSelector(channelsSelectors.selectAll).map(channel=>channel.name)

  const validationSchema = Yup.object().shape({
    name: Yup
    .string()
    .notOneOf(channelsNames)
    .trim()
    .required()
    .min(3)
    .max(20)

  });
 
  useEffect(() => {
  
  }, []);

 

    const formik = useFormik({
        initialValues: {
          name: '',
        },
        validationSchema,

        onSubmit: values => {
        const channel ={name:values.name};
        useSockets.dispatchingSockets.addChanel(channel)
        formik.resetForm()
        onHide()
        },
      });


  return (
    <>
      <Modal show >
        <Modal.Header closeButton onHide={onHide} >
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя канала"
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
          onClick={onHide}>
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























