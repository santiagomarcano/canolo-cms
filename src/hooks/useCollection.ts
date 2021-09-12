import { getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";

const useCollection = (col: any, initialState?: any, deps: Array<any> = []) => {
  const [state, setState] = useState<any>(initialState || null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let snapshot: any = null;
    setLoading(true);
    (async () => {
      try {
        snapshot = await getDocs(col);
        setState(snapshot);
        setLoading(false);
      } catch (err) {
        snapshot = await getDocs(col);
        setState(snapshot);
        setLoading(false);
      }
    })();
  }, deps);
  return [state, loading];
};

export default useCollection;
