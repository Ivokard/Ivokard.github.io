import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      test: "Welcome to React and react-i18next"
    }
  },
  fr: {
    translation: {
      test: "Bienvenue à React et react-i18next"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en", 
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

// i18n.changeLanguage('en', (err, t) => {
//   if (err) return console.log('something went wrong loading', err);
//   t('key'); // -> same as i18next.t
// });

// // using Promises
// i18n
//   .changeLanguage('en')
//   .then((t) => {
//     t('key'); // -> same as i18next.t
//   });

// // manually re-detecting language
// i18n.changeLanguage().then(...)

  export default i18n;