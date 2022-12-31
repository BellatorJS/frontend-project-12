/* eslint-disable react/jsx-no-constructed-context-values */
import CreateSocketListeners from './SocketListeners ';
import ApiContext from '../contexts/ApiContext';

const ApiProvider = ({ socket, children }) => {
  const getSocketStatus = (responce) => console.log(responce.status);

  CreateSocketListeners(socket);

  const dispatchingSockets = {
    addChanel: (channel) => socket.emit('newChannel', channel, (getSocketStatus)),
    removeChannel: (id) => socket.emit('removeChannel', id, (getSocketStatus)),
    renameChannel: (newPayload) => socket.emit('renameChannel', newPayload, (getSocketStatus)),
    addMessage: (newMessage) => socket.emit('newMessage', newMessage, (getSocketStatus)),
  };

  return (
    <ApiContext.Provider value={dispatchingSockets}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
