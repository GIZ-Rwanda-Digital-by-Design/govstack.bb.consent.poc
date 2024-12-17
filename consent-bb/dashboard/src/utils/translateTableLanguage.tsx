import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// this component is used to force rerendering of table languages
const useLanguageChange = () => {
  const { i18n } = useTranslation();
  const [key, setKey] = useState(0);

  useEffect(() => {
    const languageChanged = () => {
      setKey((prevKey) => prevKey + 1);
    };

    i18n.on("languageChanged", languageChanged);

    return () => {
      i18n.off("languageChanged", languageChanged);
    };
  }, [i18n]);

  return key;
};

export default useLanguageChange;
