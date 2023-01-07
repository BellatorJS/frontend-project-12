import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { messagesSelectors } from '../slices/messages-slice';

import { channelIdSelector, channelsSelectors } from '../slices/channels-slice';

const useMessage = () => {
  const dummy = useRef();
  const id = useSelector(channelIdSelector);
  const allMsgs = useSelector((state) => messagesSelectors.selectEntities(state));
  const messages = Object.values(allMsgs).filter((x) => x.channelId === id);
  const channel = useSelector((state) => channelsSelectors.selectById(state, id));
  useEffect(() => {
    if (messages.length !== 0) {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, channel, id]);

  return ([messages, channel, dummy]);
};

export default useMessage;
