
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import {channelsSelectors} from '../../feachers/channels-slice'
import {useSocket} from '../../hooks/useSockect'




export const ModalRename = (props) => {
   const {onHide, id} = props;
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


    const formik = useFormik({
        initialValues: {
          name: '',
        },
        validationSchema,
        onSubmit: values => {
        useSockets.dispatchingSockets.renameChannel({ id, name: values.name })
        formik.resetForm()
        onHide()
        },
      });


  return (
    <>
      <Modal show >
        <Modal.Header closeButton onHide={onHide} >
          <Modal.Title>Переименовать канал</Modal.Title>
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





