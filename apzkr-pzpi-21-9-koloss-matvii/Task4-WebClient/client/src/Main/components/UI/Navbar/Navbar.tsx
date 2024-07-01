import React, { ReactNode, useContext, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MAIN_ROUTE, REACT_APP_API_URL } from "../../../../consts";
import cl from "./Navbar.module.css";
import records from "../../../../records.json";
import { SearchInput } from "../SearchInput/SearchInput";
import { Controller, useForm } from "react-hook-form";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import i18n from "../../../../i18n";
import { useTranslation } from "react-i18next";
import languages from "../../../../trans/languages.json";
import { Context } from "../../../..";

interface IProps {
  children: ReactNode;
}

interface IForm {
  searchString: string;
}

export const Navbar = ({ children }: IProps) => {
  const { control, getValues, setValue } = useForm<IForm>();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const contextValue = useContext(Context);
  const [language, setLanguage] = contextValue!.language;
  const { t } = useTranslation();

  const searchItems = () => {
    if (getValues().searchString) {
      params.set("search", getValues().searchString);
    } else {
      params.delete("search");
    }

    params.delete("page");
    navigate(MAIN_ROUTE + `?${params.toString()}`);
  };

  const handleChangeLanguage = (lang: string) => {
    switch (lang) {
      case languages.ua.title:
        i18n.changeLanguage(languages.ua.title);
        setLanguage(languages.ua.title);
        break;
      case languages.ru.title:
        i18n.changeLanguage(languages.ru.title);
        setLanguage(languages.ru.title);
        break;
    }
  };

  useEffect(() => {
    setValue("searchString", params.get("search") ?? "");
  }, [location.search]);

  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        <header className={cl.header}>
          <div className={cl.headerContent}>
            <nav>
                <NavLink title={t("Go to the main page")} className={cl.headerItem} to={MAIN_ROUTE}>
                  <div className={[cl.logotype].join(" ")}>
                    <img src={`/${records?.logotype}`} alt={t("Logotype Antique-group")} />
                  </div>
                </NavLink>
              <div className={cl.headerItem}>
                <div className={cl.searching}>
                  <Controller
                    control={control}
                    name={"searchString"}
                    defaultValue={""}
                    render={({ field }) => (
                      <SearchInput
                        placeholder={t("Search")}
                        field={field}
                        callback={searchItems}
                      ></SearchInput>
                    )}
                  ></Controller>
                </div>
              </div>
              <div className={cl.headerItem}>
                <div className={cl.languagePicker}>
                  <button aria-label={t("Translate into Ukrainian")}
                    onClick={() => handleChangeLanguage(languages.ua.title)}
                    className={[
                      cl.languageItem,
                      language === languages.ua.title && cl.active,
                    ].join(" ")}
                  >
                    UA
                  </button>
                  <span>|</span>
                  <button aria-label={t("Translate into Russian")}
                    onClick={() => handleChangeLanguage(languages.ru.title)}
                    className={[
                      cl.languageItem,
                      language === languages.ru.title && cl.active,
                    ].join(" ")}
                  >
                    RU
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </div>
      <footer>
        <div className={[cl.logotype].join(" ")}>
          <img src={`/${records?.logotype}`} alt={t("Logotype Antique-group")} />
        </div>
        <nav className={cl.information}>
          {records?.contacts?.map(({ text, link, icon }) => (
            <a href={link} key={link} target="_blank" title={`${t("Go to the Instagram page")} ${text}`}>
                <div className={cl.informationItem}>
                  <div className={cl.infoItemIcon}>
                    <img src={`/${icon}`} alt={t("Icon")} />
                  </div>
                  <div className={cl.infoItemlink}>{text}</div>
                </div>
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
};
