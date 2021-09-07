import { doc } from "firebase/firestore";
import useDocumentData from "hooks/useDocumentData";
import React, { useContext, createContext, useState, useEffect } from "react";
import { ReactElement } from "react";
import { db } from "utils/firebase";

const PublishContext = createContext(useState);

const Provider = ({ children }: { children: ReactElement }): ReactElement => {
  const [data] = useDocumentData(doc(db, `updates/publish`), [], {
    subscribe: true,
  });
  return (
    <PublishContext.Provider value={data}>
      {children}
    </PublishContext.Provider>
  );
};

const usePublish = (): any => {
  const ctx = useContext(PublishContext);
  return ctx
};

export { Provider as PublishProvider, usePublish };
