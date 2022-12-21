import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from '../locales/index';

const LocalizationProvider = ({ children }) => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
};
export default LocalizationProvider;
