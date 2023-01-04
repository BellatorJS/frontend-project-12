import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { channelsSelectors } from '../../slices/channels-slice';
import { modalChannelIdSelector, modalOnlineSelector } from '../../slices/modals-slice';

const useModals = () => {
  const online = useSelector(modalOnlineSelector);
  const id = useSelector(modalChannelIdSelector);
  const channelsNames = useSelector(channelsSelectors.selectAll);
  const uniqueNames = channelsNames.map((channel) => channel.name);
  const channel = useSelector((state) => (channelsSelectors.selectById(state, id)));
  const inputRef = useRef();

  return (
    {
      channelsNames, uniqueNames, channel, id, inputRef, online,
    }

  );
};

export default useModals;
