import { ToastContainer } from 'react-toastify';
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import AuthProvider from './providers/AuthProvider';
import ChatPage from './components/PrivatePage';
import PrivateRoute from './components/PrivateRoute';
import SocketProvider from './providers/SocketProvider';
import SignUp from './components/SignUp';
import I18nextProvider from './providers/i18nextProvider';
import 'react-toastify/dist/ReactToastify.css';

leoProfanity.clearList();
leoProfanity.add(leoProfanity.getDictionary('ru'));
leoProfanity.add(leoProfanity.getDictionary('eng'));

const rollbarConfig = {
  accessToken: process.env.ACCESSTOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <I18nextProvider>
        <AuthProvider>
          <SocketProvider>
            <div className="App">
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route
                    index
                    element={(
                      <PrivateRoute>
                        <ChatPage />
                      </PrivateRoute>
          )}
                  />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
              <ToastContainer />
            </div>
          </SocketProvider>
        </AuthProvider>
      </I18nextProvider>
    </ErrorBoundary>
  </RollbarProvider>

);

export default App;
