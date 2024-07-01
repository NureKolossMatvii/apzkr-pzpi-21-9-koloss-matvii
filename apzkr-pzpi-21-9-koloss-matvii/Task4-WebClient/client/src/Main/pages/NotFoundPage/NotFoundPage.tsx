import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { MAIN_ROUTE } from "../../../consts";
import cl from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("404 Page not found")}</title>
      </Helmet>
      <div className={cl.wrapper}>
        <div className={cl.content}>
          <div className={cl.notFound}>
            <span className={cl.notFoundTitle}>404</span>
            <span className={cl.notFoundDescription}>{t("Error")}</span>
          </div>
          <div className={cl.block}>
            <h2 className={cl.title}>{t("What could have happened?")}</h2>
            <div className={cl.description}>
              <span>{t("Invalid page URL entered")}</span>
            </div>
            <div className={cl.description}>
              <span>{t("The page you wanted to enter has been removed")}</span>
            </div>
            <div className={cl.description}>
              <span>{t("The requested page address has been changed")}</span>
            </div>
          </div>
          <div className={cl.block}>
            <h2 className={cl.title}>{t("What can be done")}:</h2>
            <div className={cl.description}>
              <span>{t("Use search")}</span>
            </div>
            <div className={cl.description}>
              <span>
                <NavLink to={MAIN_ROUTE}>{t("Go to the main page")}</NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
