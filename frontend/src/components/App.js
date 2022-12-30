import { ToastContainer } from 'react-toastify';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import ChatPage from './PrivatePage';
import PrivateRoute from './PrivateRoute';
import SignUp from './SignUp';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes/routes';

const App = () => (
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
);

export default App;
