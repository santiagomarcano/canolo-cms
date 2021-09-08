import React from "react";
import Structure from "layouts/Dashboard";
import useCollection from "hooks/useCollection";
import Loader from "components/Loader";
import { PageProvider } from "store/PageContext";
import { collection as firebaseCollection, doc } from "firebase/firestore";
import { db } from "utils/firebase";
import { RouteComponentProps } from "@reach/router";
import CollectionInstanceForm from "components/CollectionInstanceForm";
import useDocumentData from "hooks/useDocumentData";

interface PageProps extends RouteComponentProps {
  collection?: string;
}

const NewCollectionInstance = ({ collection }: PageProps) => {
  const [structure] = useDocumentData(
    doc(db, `collections/${collection}`),
    [collection],
    {}
  );
  const [modules] = useCollection(firebaseCollection(db, "modules"));
  return (
    <Structure>
      <Loader state={modules}>
        {structure.modules ? (
          <PageProvider
            value={{ name: "", modules: structure.modules, state: "0" }}
          >
            <CollectionInstanceForm
              collectionId={collection || ""}
              type="new"
              modules={modules?.docs as Array<any>}
              id={null}
            />
          </PageProvider>
        ) : (
          <div></div>
        )}
      </Loader>
    </Structure>
  );
};

export default NewCollectionInstance;
