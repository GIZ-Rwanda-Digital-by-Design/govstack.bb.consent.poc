import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configStore } from "./store/configStore";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import translationEN from "./translations/en/translation.json";
import translationSV from "./translations/sv/translation.json";
import translationFI from "./translations/fi/translation.json";

declare global {
  interface Window {
    Init: any;
  }
}

i18next.init({
  resources: {
    en: {
      translation: translationEN,
    },
    sv: {
      translation: translationSV,
    },
    fi: {
      translation: translationFI,
    },
  },
  lng: localStorage.getItem("i18nextLng") || "en",
  fallbackLng: "en",
});

window.Init = (config: any) => {
  configStore.baseUrl = config.baseUrl;
  configStore.clientId = config.clientId;
  configStore.appVersion = config.appVersion;
  console.log(configStore);
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <I18nextProvider i18n={i18next}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </I18nextProvider>
  );
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
