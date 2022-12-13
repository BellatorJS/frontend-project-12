
import {SocketContext} from '../contexts/SocketContext'
import { io } from "socket.io-client";
import {channelsSelectors,channelAdded, channelRemoved} from '../feachers/channels-slice'
import {messageAdded} from '../feachers/messages-slice'
import { useDispatch, useSelector } from "react-redux";




export const SocketProvider = ({ children }) => {

const dispatch = useDispatch()
     
const socket = io();
    
 socket.on('newChannel', (channel) => {
    dispatch(channelAdded(channel))
  })
  socket.on('removeChannel', (id) => {
    dispatch(channelRemoved(id))  
  });
  socket.on('newMessage', (newMessage) => {
    dispatch(messageAdded(newMessage))
  });
  /*socket.on('renameChannel', (payload) => {
    console.log(payload); // { id: 7, name: "new name channel", removable: true }
  });
  // emit rename channel
  socket.emit('renameChannel', { id: 7, name: "new name channel" });*/


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