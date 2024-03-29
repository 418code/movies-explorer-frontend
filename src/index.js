import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";
import { CookiesProvider } from "react-cookie";
import { I18nProvider } from "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <CookiesProvider>
          <I18nProvider>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </I18nProvider>
        </CookiesProvider>
      </AuthWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
