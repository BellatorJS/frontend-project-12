import React from 'react';
import { Col } from 'react-bootstrap';
import MessagesHeader from './MesagesHeader';
import FormMessage from './FormMessage';
import useMessage from './useMessage';

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
  const [messages, item, dummy] = useMessage();
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
