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
import routes from './routes/routes';

leoProfanity.clearList();
leoProfanity.add(leoProfanity.getDictionary('ru'));
leoProfanity.add(leoProfanity.getDictionary('eng'));

const rollbarConfig = {
  accessToken: '9ac3f8e0343b4e749d0d43a3dcb32e2a',
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
            <div className="d-flex flex-column h-100">
              <Routes>
                <Route path={routes.homePage()} element={<Layout />}>
                  <Route
                    index
                    element={(
                      <PrivateRoute>
                        <ChatPage />
                      </PrivateRoute>
          )}
                  />
                </Route>
                <Route path={routes.loginPage()} element={<LoginPage />} />
                <Route path={routes.signupPage()} element={<SignUp />} />
                <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
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
