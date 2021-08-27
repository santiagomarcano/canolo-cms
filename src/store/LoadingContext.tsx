import React, { useContext, createContext, useState } from "react";
import { ReactElement } from "react";

// TODO: Internationalization

const LoadingContext = createContext([]);

const Provider = ({ children }: { children: ReactElement }): ReactElement => {
  return (
    <LoadingContext.Provider value={useState(false) as any}>
      {children}
    </LoadingContext.Provider>
  );
};

const useLoader = () => {
    return useContext(LoadingContext)
}

export { Provider as LoadingProvider, useLoader };
