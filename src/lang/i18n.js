import Backend from 'i18next-http-backend';
import en from './en.json';
import ar from './ar.json';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
    en: {
        translation: en
    },
    ar: {
        translation: ar
    }
};

i18n
    .use(initReactI18next)
    .use(Backend)
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;