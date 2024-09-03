import Backend from 'i18next-http-backend';
import en from './en.json';
import ar from './ar.json';
import de from './de.json';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const appLang = localStorage.getItem('lang');
const lang = appLang === null ? 'en' : appLang;
const resources = {
    en: {
        translation: en
    },
    ar: {
        translation: ar
    },
    de: {
        translation: de,
    }
};

i18n
    .use(initReactI18next)
    .use(Backend)
    .init({
        resources,
        lng: lang,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;