import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';

import { useRef, useEffect } from 'react';
import {useSocket} from '../hooks/useSockect'
import { nanoid } from '@reduxjs/toolkit';


export const FormMessage = ({currentChannelId} ) => {

  const user = JSON.parse(window.localStorage.getItem('userId'))
  const username = user.username
  const inputRef = useRef();
  const useSockets =useSocket()

  useEffect(() => {
    inputRef.current.focus();
  }, []);

        const formik = useFormik({
          initialValues: {
            message: '',
          },
          onSubmit: (values, {resetForm}) => {
            const newMessage = {
              id: nanoid(),
              body: values.message,
              channelId: currentChannelId,/////////!!!!!!!!!!!!!!
              username: username
            }
            useSockets.dispatchingSockets.addMessage(newMessage)         
            resetForm();
            inputRef.current.focus();
          },
        });      
  return (
    <Form onSubmit={formik.handleSubmit} novalidate="" className="py-1 border rounded-2">
        <InputGroup htmlFor="form" className="input-group has-validation">
        <Form.Control
          ref={inputRef}
          controlId="form"
          placeholder = "Введите сообщение..." 
          aria-label = "Новое сообщение"
          //aria-describedby="basic-addon1"
          className="border-0 p-0 ps-2 form-control"
          value={formik.values.message}
          onChange={formik.handleChange}
          name="message"
        />
    <Button
    type="submit"
    disabled="" 
    className="btn btn-group-vertical">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
        </path>
    </svg>
    <span class="visually-hidden">Отправить</span> 
    </Button>
      </InputGroup>
    </Form>
  )
}

