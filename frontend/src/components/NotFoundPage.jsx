import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import notfound from '../assets/notfound.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <div className="text-center">
        <img alt={t('notFound.header')} className="img-fluid h-25" src={notfound} />
        <h1 className="h4 text-muted">
          {t('notFound.header')}
        </h1>
        <p className="text-muted">
          {t('notFound.message')}
          <Link to="/">
            {t('notFound.linkText')}
            {' '}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
