import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {setFetchedMessages} from '../feachers/messages-slice';
import {channelsSelectors, currentChannelSelectors, setFetchedChannels} from '../feachers/channels-slice'
import { Chanels } from './Chanels';
import { Messages } from './Messages';
import {FormMessage} from './FormMessage'
import {messagesSelectors} from '../feachers/messages-slice'
import useAuth from '../hooks/useAuth';
import Spinner from 'react-bootstrap/Spinner';
import PacmanLoader from "react-spinners/PacmanLoader";
import Alert from 'react-bootstrap/Alert';


//<PacmanLoader color="hsla(344, 67%, 53%, 1)" />

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

  const { user, getAuthHeader } = useAuth();
console.log(user)
const dispatch = useDispatch();
const [loaded, setLoaded] = useState(false);




useEffect(()=> {
const fetchData = async () => {
  setLoaded(false);
  const res = await axios.get('/api/v1/data', {
    headers: getAuthHeader(),
  });
const { messages, channels, currentChannelId } = res.data;
console.log(messages, channels, currentChannelId)
dispatch(setFetchedChannels({channels,currentChannelId } ))
dispatch(setFetchedMessages({messages}))

if(res.data) {
  setLoaded(true)
}
}
 
fetchData()



},[dispatch, getAuthHeader]);

const currentChannelId = useSelector(state=>state.channels.currentChannelId)
const channels = useSelector(channelsSelectors.selectAll)
const messages = useSelector(messagesSelectors.selectAll)

  return  (
    loaded ? (<>
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
    :(<LoadingPage />)
  
 

)

};
