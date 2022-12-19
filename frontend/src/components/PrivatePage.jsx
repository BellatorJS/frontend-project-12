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
import useAuth from '../hooks/useAuth';
const getAuthHeader = () => {

  const user = JSON.parse(window.localStorage.getItem('user'));
console.log("FFFFFFFFFFFFFFFFFFFF")
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

export const PrivatePage = () => {

  const { user, logIn, logOut } = useAuth();
console.log(user)
const dispatch = useDispatch();
/*const username = JSON.parse(window.localStorage.getItem('userId'))

console.log(username.username, "@#!!!!!!!!!!!!!")*/


useEffect(()=> {

dispatch(fetchChannels(getAuthHeader))
dispatch(fetchMessages(getAuthHeader))


},[dispatch]);




const currentChannelId = useSelector(state=>state.channels.currentChannelId)
const channels = useSelector(channelsSelectors.selectAll)
const messages = useSelector(messagesSelectors.selectAll)
console.log(user)
  return  (
      currentChannelId && 
    <>
    <div class="d-flex flex-column h-100"> 
    <div class="container h-100 my-4 overflow-hidden rounded shadow">
      <div class="row h-100 bg-white flex-md-row">
      
        <Chanels channels= {channels} />
    
        <div class="col p-0 h-100">
              <div class="col p-0 h-100"><div class="d-flex flex-column h-100">    
            { <Messages messages={messages} id={currentChannelId} />}   
                <div class="mt-auto px-5 py-3">
                <FormMessage currentChannelId={currentChannelId} />
                  </div>    
            </div>
            </div>
        </div>
          </div>
        </div>
      </div>    
</>
 

)
// END
};

