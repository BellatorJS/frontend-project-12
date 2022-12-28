import { useSelector } from 'react-redux';

import { channelsSelectors } from '../feachers/channels-slice';
import { modalStatusSelector } from '../feachers/modals-slice';

const useChannels = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const modalStatus = useSelector(modalStatusSelector);

  return ([channels, modalStatus]);
};

export default useChannels;
