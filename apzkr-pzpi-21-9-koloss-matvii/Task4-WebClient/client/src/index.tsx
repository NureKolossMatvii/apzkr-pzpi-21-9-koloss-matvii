import React, { createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { useLocalStorage } from "./hooks/useLocalStorage";
import UserStore from "./store/UserStore";
import languages from "./trans/languages.json";
import { HelmetProvider } from "react-helmet-async";
import HttpsRedirect from "react-https-redirect";

type ContextValue = {
  user: UserStore;
  language: [string, (newValue: string) => void];
} | null;

export const Context = createContext<ContextValue>(null);

const RootComponent: React.FC = () => {
  const language = useLocalStorage("language", languages.ua.title);

  return (
    <HelmetProvider>
      <Context.Provider
        value={{
          user: new UserStore(),
          language: language,
        }}
      >
        <App />
      </Context.Provider>
    </HelmetProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RootComponent />
);
