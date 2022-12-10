import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';


export const Modals = (props) => {


    const {show, onHide:handleClose} = props;

    const formik = useFormik({
        initialValues: {
          name: '',

        },
        onSubmit: values => {
          console.log(values.name)
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
              />
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























