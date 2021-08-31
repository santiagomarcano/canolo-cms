import { getDocs } from "@firebase/firestore";
import {
  getDownloadURL,
  list,
  ListResult,
  listAll,
  getMetadata,
  FullMetadata,
} from "firebase/storage";
import React, { useEffect, useState } from "react";

interface Props {
  as: string;
  ref: any;
  page: number;
  amount: number;
}

interface ListOptions {
  maxResults: number;
  pageToken?: any;
}

interface File {
  url: string;
  meta: {
    customMetadata: {
      originalName: string;
      uploadedAt: string;
    };
  };
  ref: any;
}

let pageTokens: Array<string | undefined> = [];

const useStorage = (
  { as, ref, page = 1, amount = 50 }: Props,
  deps: Array<any>
): [Array<File>, number | null, boolean] => {
  const [state, setState] = useState<Array<File>>([]);
  const [loading, setLoading] = useState(false);
  const [listLength, setListLength] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (as === "paginated-list") {
        try {
          const { items } = await listAll(ref);
          const refs: any = [];
          let promises: any = [];
          for (let item of items) {
            if (item.name.includes("size{300}")) {
              promises.push(getDownloadURL(item), getMetadata(item));
              refs.push(item);
            }
          }
          const result: any = await Promise.all(promises);
          let formattedResult = [];
          for (let i = 0; i < result.length; i++) {
            if (i % 2 === 0) {
              formattedResult.push({
                url: result[i],
                meta: result[i + 1],
                ref: null,
              });
            }
          }
          formattedResult = formattedResult.map((item, index) => ({
            ...item,
            ref: refs[index],
          }));
          setState(
            formattedResult.sort(
              (a, b) =>
                +b.meta.customMetadata.uploadedAt -
                +a.meta.customMetadata.uploadedAt
            )
          );
          setLoading(false);
        } catch (err) {
          alert(err);
        }
      }
    })();
    return () => {
      setLoading(false);
    };
  }, deps);
  useEffect(() => {
    (async () => {
      const { items } = await listAll(ref);
      setListLength(items.length);
    })();
    return () => {
      // setListLength(null);
    };
  }, []);
  return [state, listLength, loading];
};

export default useStorage;
