import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Spinner from 'react-bootstrap/Spinner';
import PacmanLoader from 'react-spinners/PacmanLoader';
import Alert from 'react-bootstrap/Alert';
import { toast, ToastContainer } from 'react-toastify';
import { setFetchedMessages, messagesSelectors } from '../feachers/messages-slice';
import { channelsSelectors, setFetchedChannels } from '../feachers/channels-slice';
import Channels from './Channels';
import Messages from './Messages';
import FormMessage from './FormMessage';
import useAuth from '../hooks/useAuth';

import 'react-toastify/dist/ReactToastify.css';

const LoadingPage = () => (
  <div className="h-100 d-flex align-items-center flex-column bd-highlight mb-3">
    <PacmanLoader color="hsla(344, 67%, 53%, 1)" size={98} />
    <Alert variant="primary">
      <Alert.Heading> Идет загрузка чата</Alert.Heading>
    </Alert>
  </div>

);

const PrivatePage = () => {
  const { user, getAuthHeader } = useAuth();
  console.log(user);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);
      const res = await axios.get('/api/v1/data', {
        headers: getAuthHeader(),
      });
      const { messages, channels, currentChannelId } = res.data;
      console.log(messages, channels, currentChannelId);
      dispatch(setFetchedChannels({ channels, currentChannelId }));
      dispatch(setFetchedMessages({ messages }));

      if (res.data) {
        setLoaded(true);
      }
    };

    fetchData();
  }, [dispatch, getAuthHeader]);

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);

  return (
    loaded ? (
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels channels={channels} />
            <div className="col p-0 h-100">
              <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <Messages messages={messages} id={currentChannelId} />
                  <div className="mt-auto px-5 py-3">
                    <FormMessage currentChannelId={currentChannelId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    )
      : (<LoadingPage />)

  );
};

export default PrivatePage;
