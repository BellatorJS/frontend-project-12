import { useDispatch } from 'react-redux';
import {
  channelAdded, channelRemoved, channelUpdated,
} from '../slices/channels-slice';
import { messageAdded } from '../slices/messages-slice';
import { onLine } from '../slices/modals-slice';

const CreateSocketListeners = (socket) => {
  const dispatch = useDispatch();

  // const cb = (id) => dispatch(setChannel(id));

  /* socket.on('newChannel', (channel, cb) => {
    dispatch(channelAdded(channel));
    cb(channel.id);
  }); */
  socket.on('newChannel', (channel) => {
    dispatch(channelAdded(channel));
  });
  socket.on('removeChannel', (data) => {
    const { id } = data;
    dispatch(channelRemoved(id));
  });
  socket.on('newMessage', (newMessage) => {
    dispatch(messageAdded(newMessage));
  });
  socket.on('renameChannel', (renamedChannel) => {
    const { id, name } = renamedChannel;
    dispatch(channelUpdated({ id, changes: { name } }));
  });
  socket.on('disconnect', () => {
    dispatch(onLine(false));
  });
  socket.on('connect', () => {
    dispatch(onLine(true));
  });
};

export default CreateSocketListeners;
