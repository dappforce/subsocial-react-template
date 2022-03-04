import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translation_en from './en.json';
import translation_ru from './ru.json';
import languages from './languages';
import { DateService } from '../utils';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translation_en
      },
      ru: {
        translation: translation_ru
      }
    },
  });

const lng = i18n.language.replace(/"/g, '');

i18n.changeLanguage(lng, () => DateService.updateLocale(lng));
i18n.on('languageChanged', (lang) => DateService.updateLocale(lang));

if (!Object.keys(languages).includes(i18n.language)) {
  i18n.changeLanguage(Object.keys(languages)[0]);
}

export default i18n;
