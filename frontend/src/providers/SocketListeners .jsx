import { useDispatch } from 'react-redux';
import {
  channelAdded, channelRemoved, setChannel, channelUpdated,
} from '../slices/channels-slice';
import { messageAdded } from '../slices/messages-slice';
import { onLine } from '../slices/modals-slice';

const CreateSocketListeners = (socket) => {
  const defaultChannelId = 1;
  const dispatch = useDispatch();

  socket.on('newChannel', (channel) => {
    dispatch(channelAdded(channel));
    dispatch(setChannel(channel.id));
  });
  socket.on('removeChannel', (data) => {
    const { id } = data;
    dispatch(channelRemoved(id));
    dispatch(setChannel(defaultChannelId));
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
