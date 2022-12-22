import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { setChannel } from '../feachers/channels-slice';
import getModal from './modals/index';

const Channels = ({ channels }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const buttons = channels.reduce((acc, channel) => ({ ...acc, [channel.id]: false }), {});

  const [state, setActive] = useState(buttons);

  const handleClick = (id) => {
    setActive({ ...buttons, [id]: !state.id });
    dispatch(setChannel(id));
  };

  const [modalInfo, setModalInfo] = useState({ type: null, id: null });
  const hideModal = () => setModalInfo({ type: null, id: null });
  const showModal = (type, id = null) => setModalInfo({ type, id });

  // eslint-disable-next-line no-shadow
  const renderModal = ({ modalInfo, hideModal }) => {
    if (!modalInfo.type) {
      return null;
    }

    const Component = getModal(modalInfo.type);

    return <Component id={modalInfo.id} onHide={hideModal} />;
  };

  return (

    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <button
          onClick={() => {
            showModal('adding');
          }}
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <li
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
                  variant={state[channel.id] ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start text-truncate "
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
                   variant={state[channel.id] ? 'secondary' : 'light'}
                   className="w-100 rounded-0   text-start text-truncate"
                 >
                   <span className="me-1"># </span>
                   {channel.name}
                 </Button>
                 <Dropdown.Toggle
                   split
                   id={channel.id}
                   aria-expanded="false"
                   className="flex-grow-0  dropdown-toggle dropdown-toggle-split btn"
                   variant={state[channel.id] ? 'secondary' : 'light'}
                 />
                 <Dropdown.Menu>
                   <Dropdown.Item onClick={() => showModal('removing', channel.id)} href="#/action-1">{t('channels.remove')}</Dropdown.Item>
                   <Dropdown.Item onClick={() => showModal('renaming', channel.id)} href="#/action-2">{t('channels.rename')}</Dropdown.Item>
                 </Dropdown.Menu>
               </Dropdown>
               )}
            </ButtonGroup>
          </li>
        ))}
      </ul>
      {renderModal({ modalInfo, hideModal })}

    </div>

  );
};

export default Channels;
