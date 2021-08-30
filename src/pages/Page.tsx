import React from "react";
import Structure from "layouts/Dashboard";
import useCollection from "hooks/useCollection";
import Loader from "components/Loader";
import PageForm from "components/PageForm";
import { PageProvider } from "store/PageContext";
import { collection, doc } from "firebase/firestore";
import { db } from "utils/firebase";
import { RouteComponentProps } from "@reach/router";
import useDocumentData from "hooks/useDocumentData";

interface PageProps extends RouteComponentProps {
  page?: string;
}

const Page = ({ page }: PageProps) => {
  const [modules] = useCollection(collection(db, "modules"));
  const [state, loading] = useDocumentData(doc(db, `pages/${page}`), [page]);
  // { name: "", modules: [] }
  console.log(state)
  return (
    <Structure>
      <Loader state={!loading}>
        <PageProvider value={state}>
          <PageForm type="update" modules={modules?.docs as Array<any>} />
        </PageProvider>
      </Loader>
    </Structure>
  );
};

export default Page;
