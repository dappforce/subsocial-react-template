import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translation_en from './en.json';
import translation_ru from './ru.json';
import languages from '../config/languages';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'en': {
        translation: translation_en
      },
      'ru': {
        translation: translation_ru
      }
    },
  })

  if (!Object.keys(languages).includes(i18n.language)) {
    i18n.changeLanguage(Object.keys(languages)[0]);
  }
