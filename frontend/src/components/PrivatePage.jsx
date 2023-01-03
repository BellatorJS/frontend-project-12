import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import { Container, Row } from 'react-bootstrap';
import { setFetchedMessages } from '../slices/messages-slice';
import { setFetchedChannels } from '../slices/channels-slice';
import Channels from './Channels';
import Messages from './Messages';
import routes from '../routes/routes';
import useAuth from '../hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';

const LoadingPage = () => {
  const { t } = useTranslation();
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary" />
      <span className="visually-hidden">{t('loading')}</span>
    </div>
  );
};

const PrivatePage = () => {
  const { t } = useTranslation();
  const { getAuthHeader, logOut } = useAuth();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoaded(false);
        const res = await axios.get(routes.dataPath(), {
          headers: getAuthHeader(),
        });
        const { messages, channels, currentChannelId } = await res.data;
        dispatch(setFetchedChannels({ channels, currentChannelId }));
        dispatch(setFetchedMessages({ messages }));
        if (res.data) {
          setLoaded(true);
        }
      } catch (error) {
        if (error.response.status === 401) {
          toast.error(t('loginErrors.authorization'));
          logOut();
        } else {
          toast.error(t('loginErrors.unknown'));
        }
      }
    };
    fetchData();
  }, [dispatch, getAuthHeader, logOut, t]);

  return (
    loaded ? (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>

    )
      : (<LoadingPage />)

  );
};

export default PrivatePage;
