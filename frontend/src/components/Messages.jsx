import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { messagesSelectors } from '../feachers/messages-slice';
import { channelsSelectors } from '../feachers/channels-slice';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Messages = (props) => {
  const { t } = useTranslation();

  const { id } = props;

  const item = useSelector((state) => channelsSelectors.selectById(state, id));

  const allMsgs = useSelector((state) => messagesSelectors.selectEntities(state));
  const msgs = Object.values(allMsgs).filter((x) => x.channelId === id);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {item.name}
          </b>
        </p>
        <span className="text-muted">
          {' '}
          {t('messages.counter.key', { count: msgs.length })}
        </span>
      </div>
      <div
        id="messages-box"
        className="chat-messages overflow-auto px-5 "
      >
        { (msgs.length !== 0) && msgs.map((message) => (
          <div className="text-break mb-2" key={message.id}>
            <b>{message.username}</b>
            :
            {message.body}

          </div>
        ))}
      </div>

    </>
  );
};
export default Messages;
