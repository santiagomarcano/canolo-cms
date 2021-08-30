import React, { useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";

const useDocumentData = (dc: any, deps: Array<any>) => {
  const [state, setState] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const snapshot = await getDoc(dc);
      console.log("snapsho", snapshot.data());
      setLoading(false);
    })();
  }, deps);
  return [state, loading];
};

export default useDocumentData;
