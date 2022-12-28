import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { messagesSelectors } from '../feachers/messages-slice';
import MessagesHeader from './MesagesHeader';
import FormMessage from './FormMessage';
import { channelsSelectors, channelIdSelector } from '../feachers/channels-slice';

const Message = ({
  username,
  body,
}) => (
  <div className="text-break mb-2">
    <b>
      {username}
    </b>

    {': '}

    {body}
  </div>
);

const Messages = () => {
  // const messages = useSelector(messagesSelectors.selectAll);
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

  return (

    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader msgs={messages} item={item} />

        <div
          className="chat-messages overflow-auto px-5 "
          id="messages-box"
        >
          {messages ? messages.map((m) => (
            <Message
              body={m.body}
              key={m.id}
              username={m.username}
            />
          )) : null}

          <span ref={dummy} />
        </div>

        <FormMessage />
      </div>
    </Col>

  );
};

export default Messages;
