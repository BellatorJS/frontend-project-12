import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { setChannel } from '../feachers/channels-slice';
import { useDispatch } from 'react-redux';
//import {ModalRemove} from './ModalRemove'

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
//import { Modals } from './modals/ModalAdd';
import getModal from './modals/index';

export const Chanels = ({channels}) => {

  const dispatch = useDispatch()
 
  const buttons = channels.reduce((acc, channel) => {
    return { ...acc, [channel.id]: false };
  }, {});

  const [state, setActive] = useState(buttons);

const handleClick=(id)=> {
  console.log(id)
  setActive({...buttons, [id]:!state.id })
  dispatch(setChannel(id))
}

/*const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
 /*  <ModalRemove  show={ShowRemoveModal1} onHide={handleCloseRemove}    
                    />
                      <Modals show={show} onHide={handleClose}/>*

const [ShowRemoveModal1, ShowRemoveModal] = useState(false);
const handleCloseRemove = () => ShowRemoveModal(false);
const handleShowRemove = () => ShowRemoveModal(true);*/

const [modalInfo, setModalInfo] = useState({ type: null, id: null });
  const hideModal = () => setModalInfo({ type: null, id: null });
  const showModal = (type, id = null) => setModalInfo({ type, id });


const renderModal = ({ modalInfo, hideModal, id }) => {
  console.log(modalInfo.type)
  if (!modalInfo.type) {
    return null;
  }
 
  const Component = getModal(modalInfo.type);
  console.log(Component)
  return <Component modalInfo={modalInfo} id={id} onHide={hideModal} />;
};


  return ( 

      <div class="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div class="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>Каналы</span>
          <button
           onClick={() => {
            console.log("dsf")
            showModal('adding')}}
          type="button"
           class="p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </button>
              </div>
              <ul class="nav flex-column nav-pills nav-fill px-2">
             {channels.map((channel)=>  
             <li key={channel.id}
             className="nav-item w-100">
              <ButtonGroup vertical className="d-flex">
                {!channel.removable &&
                <Button type="button"
                    onClick={()=>handleClick(channel.id)}
                    aria-expanded="false"
                    variant = {state[channel.id] ? "secondary" : "light" } 
                    className="w-100 rounded-0 text-start text-truncate ">
                    <span class="me-1">#</span>
                    {channel.name}
                 </Button>}
                 {channel.removable &&
               <Dropdown as={ButtonGroup}>
               <Button type="button"
                    onClick={()=>handleClick(channel.id)}
                    variant = {state[channel.id] ? "secondary" : "light" } 
                    className="w-100 rounded-0   text-start text-truncate">
                    <span class="me-1">#</span>
                    {channel.name}
                 </Button>
               <Dropdown.Toggle split
               id={channel.id}
               aria-expanded="false"
               className="flex-grow-0  dropdown-toggle dropdown-toggle-split btn"
                variant = {state[channel.id] ? "secondary" : "light" }
                />
               <Dropdown.Menu>
                 <Dropdown.Item onClick={() => showModal('removing',channel.id)} href="#/action-1">Удалить</Dropdown.Item>
                 <Dropdown.Item onClick={() => showModal('renaming',channel.id)} href="#/action-2">Переименовать</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>
                 
                 }
                 </ButtonGroup>
                    </li>
                    )}
                      </ul>
                      {renderModal({ modalInfo, hideModal })}
                   
         
      </div>
      

  )
}
