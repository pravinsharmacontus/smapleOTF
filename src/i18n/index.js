import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import English from "../locales/en/translation.json";
import Denmark from "../locales/de/translation.json";

const resources = {
    en: {
        translation: English
    },
    de: {
        translation: Denmark
    }
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: "en",
    debug: true,
    lng: "en",
    interpolation: {
        escapeValue: false // not needed for react as it escapes by default
    }
});
export default i18n;
