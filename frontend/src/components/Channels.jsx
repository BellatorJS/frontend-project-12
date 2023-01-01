import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Nav,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { setChannel, channelsSelectors, channelIdSelector } from '../slices/channels-slice';
import getModal from './modals/index';
import { showModal, modalStatusSelector } from '../slices/modals-slice';

const Channels = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalStatus = useSelector(modalStatusSelector);
  const currentChannelId = useSelector(channelIdSelector);

  const handleClick = (id) => {
    dispatch(setChannel(id));
  };

  const renderModal = (modalInfo) => {
    console.log(modalInfo);
    if (!modalInfo.type) {
      return null;
    }
    const Component = getModal(modalInfo.type);
    return <Component modalInfo />;
  };

  return (

    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <button
          onClick={() => {
            dispatch(showModal(
              {
                isOpened: false,
                type: 'adding',
                extra: null,
              },
            ));
          }}
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <Nav className="d-flex flex-column px-2" fill variant="pills" as="ul">
        {channels.map((channel) => (
          <Nav.Item
            as="li"
            key={channel.id}
            className="nav-item w-100"
          >
            <ButtonGroup vertical className="d-flex">
              {!channel.removable
                && (
                <Button
                  type="button"
                  onClick={() => handleClick(channel.id)}
                  aria-expanded="false"
                  variant={(channel.id === currentChannelId) ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start text-truncate"
                >
                  <span className="me-1"># </span>
                  {channel.name}
                </Button>
                )}
              {channel.removable
               && (
               <Dropdown as={ButtonGroup}>
                 <Button
                   type="button"
                   onClick={() => handleClick(channel.id)}
                   variant={(channel.id === currentChannelId) ? 'secondary' : 'light'}
                   className="w-100 rounded-0 text-start text-truncate"
                 >
                   <span className="me-1"># </span>
                   {channel.name}
                 </Button>
                 <Dropdown.Toggle
                   split
                   id={channel.id}
                   className="flex-grow-0  dropdown-toggle dropdown-toggle-split btn"
                   variant={(channel.id === currentChannelId) ? 'secondary' : 'light'}
                 >
                   <span className="visually-hidden">{t('channels.management')}</span>
                 </Dropdown.Toggle>
                 <Dropdown.Menu>
                   <Dropdown.Item onClick={() => dispatch(showModal({
                     isOpened: false,
                     type: 'removing',
                     extra: {
                       channelId: channel.id,
                     },
                   }))}
                   >
                     {t('channels.remove')}
                   </Dropdown.Item>
                   <Dropdown.Item onClick={() => dispatch(showModal({
                     isOpened: false,
                     type: 'renaming',
                     extra: {
                       channelId: channel.id,
                     },
                   }))}
                   >
                     {t('channels.rename')}
                   </Dropdown.Item>
                 </Dropdown.Menu>

               </Dropdown>
               )}
            </ButtonGroup>
          </Nav.Item>
        ))}
      </Nav>
      {renderModal(modalStatus)}
    </Col>

  );
};

export default Channels;
