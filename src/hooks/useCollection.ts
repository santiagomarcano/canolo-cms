import { getDocs } from "@firebase/firestore";
import React, { useEffect, useState } from "react";

const useCollection = (col: any) => {
  const [state, setState] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      const snapshot = await getDocs(col);
      setState([snapshot]);
    })();
  }, []);
  return state;
};

export default useCollection;
