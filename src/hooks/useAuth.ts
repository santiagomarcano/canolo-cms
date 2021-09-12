import { useEffect, useState } from "react";

const useAuth = ({ auth, deps }: { auth: any; deps: any }) => {
  const [state, setState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        setState(user);
      }
      setLoading(false);
    });
  }, deps);
  return [state, loading];
};

export default useAuth;
