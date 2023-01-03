/* eslint-disable react/jsx-no-constructed-context-values */
import CreateSocketListeners from './SocketListeners ';
import ApiContext from '../contexts/ApiContext';

const ApiProvider = ({ socket, children }) => {
  CreateSocketListeners(socket);

  const dispatchingSockets = {
    addChanel: (channel, cb) => socket.emit('newChannel', channel, (response) => cb(response)),
    removeChannel: (id, cb) => socket.emit('removeChannel', id, (response) => cb(response)),
    renameChannel: (newPayload, cb) => socket.emit('renameChannel', newPayload, (response) => cb(response)),
    addMessage: (newMessage, cb) => socket.emit('newMessage', newMessage, (response) => cb(response)),
  };

  return (
    <ApiContext.Provider value={dispatchingSockets}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
