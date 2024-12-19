import i18next from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(ChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    backend: {
      backends: [
        HttpBackend, // if a namespace can't be loaded via normal http-backend loadPath, then the inMemoryLocalBackend will try to return the correct resources
        resourcesToBackend({
          en: {
            translation: {}
          }
        })
      ],
      defaultNS: 'translation',
      // set the namespaces
      // ns: ['mdm', 'translation'],
      backendOptions: [
        {
          loadPath: process.env.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json'
        }
      ]
    }
  });
