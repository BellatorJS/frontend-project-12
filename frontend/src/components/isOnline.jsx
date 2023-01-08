import React from 'react';
import {
  Badge,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { modalOnlineSelector } from '../slices/modals-slice';

const IsOnline = () => {
  const { t } = useTranslation();
  const hasOnline = useSelector(modalOnlineSelector);
  const OffLine = t('socketsStatus.OffLine');
  const Online = t('socketsStatus.OnLine');
  return (
    <Badge bg={!hasOnline ? 'danger' : 'success'}>{!hasOnline ? OffLine : Online}</Badge>

  );
};

export default IsOnline;
