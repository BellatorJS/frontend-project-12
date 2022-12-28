import React from 'react';
import { useTranslation } from 'react-i18next';

const MessagesHeader = (props) => {
  const { item, msgs } = props;
  const { t } = useTranslation();

  console.log('HEADER');

  return (
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
  );
};
export default MessagesHeader;
