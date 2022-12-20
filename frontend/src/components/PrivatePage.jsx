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
import Spinner from 'react-bootstrap/Spinner';
import PacmanLoader from "react-spinners/PacmanLoader";
import Alert from 'react-bootstrap/Alert';


//<PacmanLoader color="hsla(344, 67%, 53%, 1)" />




const getAuthHeader = () => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

const LoadingPage = () => {
return(
  <div className="h-100 d-flex align-items-center flex-column bd-highlight mb-3">
    <PacmanLoader color="hsla(344, 67%, 53%, 1)" size={98} />
    <Alert variant="primary">
      <Alert.Heading> Идет загрузка чата</Alert.Heading>
    </Alert>
</div>

)  
}



export const PrivatePage = () => {

  const { user } = useAuth();
console.log(user)
const dispatch = useDispatch();

useEffect(()=> {

dispatch(fetchChannels(getAuthHeader))
dispatch(fetchMessages(getAuthHeader))


},[dispatch]);




const currentChannelId = useSelector(state=>state.channels.currentChannelId)
const channels = useSelector(channelsSelectors.selectAll)
const messages = useSelector(messagesSelectors.selectAll)
const status = useSelector(state=>state.messages.status)



  return  (
      (status==="succeeded" && currentChannelId)
       ?
(<>
    <div class="d-flex flex-column h-100"> 
    <div class="container h-100 my-4 overflow-hidden rounded shadow">
      <div class="row h-100 bg-white flex-md-row">
      

        <Chanels channels= {channels} />
    
        <div class="col p-0 h-100">
              <div class="col p-0 h-100">
                <div class="d-flex flex-column h-100"> 
               
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
    </>)
    : <LoadingPage />
 

)

};
