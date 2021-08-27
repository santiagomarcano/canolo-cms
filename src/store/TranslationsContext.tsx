import React, { useContext, createContext } from "react";
import { ReactElement } from "react";
import es from "assets/i18n/es.json";

// TODO: Internationalization

const TranslationsContext = createContext(es);

const Provider = ({ children }: { children: ReactElement }): ReactElement => {
  return (
    <TranslationsContext.Provider value={es}>
      {children}
    </TranslationsContext.Provider>
  );
};

const $t = (label: string): string => {
  const ctx: any = useContext(TranslationsContext);
  // if (!label) {
  //     return ctx;
  // }
  if (ctx[label]) {
    return ctx[label];
  }
  return label;
};

export { Provider as TranslationsProvider, $t };
