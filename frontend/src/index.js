import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import init from './init';
import { io } from 'socket.io-client';
const app = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init(socket);
  root.render(
    <React.StrictMode>
      {vdom}
    </React.StrictMode>,
  );
};

app();
