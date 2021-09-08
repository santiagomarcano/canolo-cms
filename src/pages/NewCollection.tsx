import React from "react";
import Structure from "layouts/Dashboard";
import useCollection from "hooks/useCollection";
import Loader from "components/Loader";
import CollectionForm from "components/CollectionForm";
import { PageProvider } from "store/PageContext";
import { collection } from "firebase/firestore";
import { db } from "utils/firebase";
import { RouteComponentProps } from "@reach/router";

interface PageProps extends RouteComponentProps {}

const NewCollection = ({}: PageProps) => {
  const [modules] = useCollection(collection(db, "modules"));
  return (
    <Structure>
      <Loader state={modules}>
        <PageProvider value={{ name: "", modules: [] }}>
          <CollectionForm
            type="new"
            modules={modules?.docs as Array<any>}
            id={null}
          />
        </PageProvider>
      </Loader>
    </Structure>
  );
};

export default NewCollection;
