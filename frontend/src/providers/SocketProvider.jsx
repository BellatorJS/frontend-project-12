
import {SocketContext} from '../contexts/SocketContext'
import { io } from "socket.io-client";
import {channelsSelectors,channelAdded, channelRemoved,setChannel, channelUpdated} from '../feachers/channels-slice'
import {messageAdded} from '../feachers/messages-slice'
import { useDispatch, useSelector } from "react-redux";




export const SocketProvider = ({ children }) => {
  const defaultChannelId = 1
const dispatch = useDispatch()
     
const socket = io();
    
 socket.on('newChannel', (channel) => {
    dispatch(channelAdded(channel))
    dispatch(setChannel(channel.id))
  })
  socket.on('removeChannel', (data) => {
   const {id} = data
    dispatch(channelRemoved(id));
    dispatch(setChannel(defaultChannelId))  
  });
  socket.on('newMessage', (newMessage) => {
    dispatch(messageAdded(newMessage))
  });
  socket.on('renameChannel', (renamedChannel) => {
    const {id, name}= renamedChannel
    dispatch(channelUpdated({id, changes:{name}}))
  });



const dispatchingSockets = {

    addChanel: (channel) => socket.emit('newChannel',  channel),
    removeChannel: ( id ) => socket.emit('removeChannel', id ),
    renameChannel:(newPayload) => socket.emit('renameChannel', newPayload),
    addMessage:(newMessage)=> socket.emit('newMessage', newMessage )

  };
  

    return (
      <SocketContext.Provider value={{ dispatchingSockets }}>
        {children}
      </SocketContext.Provider>
    );
  };