/**
 * @description load additional plugins to i18next for the multi language feature
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';
import { languageDetectorPlugin } from 'utils';

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    compatibilityJSON: 'v3',
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
