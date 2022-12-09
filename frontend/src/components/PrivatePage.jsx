import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {fetchChannels} from '../feachers/channels-slice';
import {fetchMessages} from '../feachers/messages-slice';
import {channelsSelectors, currentChannelSelectors} from '../feachers/channels-slice'
import { Chanels } from './Chanels';
import { Messages } from './Messages';
import {FormMessage} from './FormMessage'
import {messagesSelectors} from '../feachers/messages-slice'

const getAuthHeader = () => {

  const userId = JSON.parse(window.localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const PrivatePage = () => {

const username = JSON.parse(window.localStorage.getItem('userId'))

console.log(username.username, "@#!!!!!!!!!!!!!")
const dispatch = useDispatch();

useEffect(()=> {

dispatch(fetchChannels(getAuthHeader))
dispatch(fetchMessages(getAuthHeader))


},[dispatch]);




const currentChannelId = useSelector(state=>state.chats.currentChannelId)
const channels = useSelector(channelsSelectors.selectAll)
const messages = useSelector(messagesSelectors.selectAll)
//const currentChannelId= useSelector(currentChannelSelectors)
//const messagesIds = useSelector(messagesSelectors.selectTotal)
//console.log(currentChannelId)
console.log(currentChannelId)
  return (
    <div class="d-flex flex-column h-100"> 
    <div class="container h-100 my-4 overflow-hidden rounded shadow">
      <div class="row h-100 bg-white flex-md-row">
      
        <Chanels channels= {channels} />
    
        <div class="col p-0 h-100">
              <div class="col p-0 h-100"><div class="d-flex flex-column h-100">    
               <Messages messages={messages} currentChannelId={currentChannelId} username={username}/>
                <div class="mt-auto px-5 py-3">
                <FormMessage currentChannelId={currentChannelId} />
                  </div>    
            </div>
            </div>
        </div>
          </div>
        </div>
      </div>    

 

)
// END
};

export default PrivatePage;


/*
<form novalidate="" class="py-1 border rounded-2">
                                <div class="input-group has-validation">
                                  <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." class="border-0 p-0 ps-2 form-control" value="" />
                                    <button type="submit" disabled="" class="btn btn-group-vertical">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
                                        </path>
                                        </svg>
                                        <span class="visually-hidden">Отправить</span>
                            </button>


*/