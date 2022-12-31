import React from 'react';

import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as StoreProvider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import i18next from 'i18next';
import dictionaryFilter from 'leo-profanity';
import AuthProvider from './providers/AuthProvider';
import App from './components/App.js';
import { store } from './store';
import resources from './locales/index.js';
import ApiProvider from './providers/ApiProvider';

const rollbarConfig = {
  accessToken: process.env.ACCESSTOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  dictionaryFilter.clearList();
  dictionaryFilter.add(dictionaryFilter.getDictionary('ru'));
  dictionaryFilter.add(dictionaryFilter.getDictionary('eng'));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <ApiProvider socket={socket}>
            <I18nextProvider i18n={i18n}>
              <AuthProvider>
                <Router>
                  <App />
                </Router>
              </AuthProvider>
            </I18nextProvider>
          </ApiProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
