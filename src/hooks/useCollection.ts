import { getDocs } from "@firebase/firestore";
import React, { useEffect, useState } from "react";

const useCollection = (col: any) => {
  const [state, setState] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const snapshot = await getDocs(col);
      setState(snapshot);
      setLoading(false);
    })();
  }, []);
  return [state, loading];
};

export default useCollection;
