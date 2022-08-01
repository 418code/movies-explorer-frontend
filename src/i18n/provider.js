import { useState, useCallback } from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./locales";
import { LocaleContext } from "../contexts/LocaleContext";
import { messages } from "./messages/index";

const Provider = ({ children }) => {
  const [locale, setLocale] = useState(LOCALES.ENGLISH);
  const changeLocale = useCallback((locale) => {
    setLocale(locale);
  }, []);

  return (
    <LocaleContext.Provider value={{ changeLocale }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default Provider;
