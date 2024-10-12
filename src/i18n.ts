import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Simulated IP-based language detection
const simulateIpBasedLanguage = () => {
  const languages = ['en', 'it'];
  return languages[Math.floor(Math.random() * languages.length)];
};

// Custom language detector
const customLanguageDetector = {
  name: 'customIpDetection',
  lookup() {
    return simulateIpBasedLanguage();
  },
  cacheUserLanguage() {}
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['customIpDetection', 'navigator'],
    },
  });

// Add the custom detector after initialization
i18n.services.languageDetector.addDetector(customLanguageDetector);

export default i18n;