import React, { useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";

const useDocumentData = (dc: any) => {
  const [state, setState] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      const snapshot = await getDoc(dc);
      setState([snapshot.data()]);
    })();
  }, []);
  return state;
};

export default useDocumentData;
