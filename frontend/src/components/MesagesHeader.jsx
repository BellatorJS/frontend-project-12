import React from 'react';
import { useTranslation } from 'react-i18next';

const MessagesHeader = (props) => {
  const { channel, msgs } = props;
  const { t } = useTranslation();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {channel?.name}
        </b>
      </p>
      <span className="text-muted">
        {' '}
        {t('messages.counter.key', { count: msgs.length })}
      </span>
    </div>
  );
};
export default MessagesHeader;
