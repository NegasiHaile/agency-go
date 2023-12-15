import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const lang = ['en','de','fr','es','ru'];
const apiKey = "TX2T-vElUlXyr8N7i_JNYg";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;
i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)  
	.init({
		fallbackLng: 'en',
		debug: true,
		whiteList: lang,

		interpolation: {
			escapeValue: false,  
		},

		// react i18next special options (optional)
		// override if needed - omit if ok with defaults
		/*
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue:  '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    }
    */
	});

export default i18n;