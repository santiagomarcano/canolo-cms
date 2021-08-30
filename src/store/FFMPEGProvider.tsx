import React, { useContext, createContext, useState } from "react";
import { ReactElement } from "react";

const FFMPEGContext = createContext([false, () => {}]);

const Provider = ({ children }: { children: ReactElement }): ReactElement => {
  return (
    <FFMPEGContext.Provider value={useState(false) as any}>
      {children}
    </FFMPEGContext.Provider>
  );
};

const useFFMPEG = (): any => useContext<any>(FFMPEGContext);

export { Provider as FFMPEGProvider, useFFMPEG };
