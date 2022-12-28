import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { messagesSelectors } from '../feachers/messages-slice';

import { channelIdSelector, channelsSelectors } from '../feachers/channels-slice';

const useMessage = () => {
  const dummy = useRef();
  // const { t } = useTranslation();
  const id = useSelector(channelIdSelector);
  const item = useSelector((state) => channelsSelectors.selectById(state, id));
  const allMsgs = useSelector((state) => messagesSelectors.selectEntities(state));
  const messages = Object.values(allMsgs).filter((x) => x.channelId === id);

  useEffect(() => {
    if (messages.length !== 0) {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return ([messages, item, dummy]);
};

export default useMessage;
