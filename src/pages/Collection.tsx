import React, { MouseEventHandler } from "react";
import Structure from "layouts/Dashboard";
import useCollection from "hooks/useCollection";
import Loader from "components/Loader";
import { PageProvider } from "store/PageContext";
import {
  collection as firebaseCollection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "utils/firebase";
import { RouteComponentProps, useNavigate } from "@reach/router";
import useDocumentData from "hooks/useDocumentData";
import { $t } from "store/TranslationsContext";
import { Module } from "interfaces/declarations";
import CollectionForm from "components/CollectionForm";

interface PageProps extends RouteComponentProps {
  collection?: string;
}

const Collection = ({ collection }: PageProps) => {
  const DELETE_COLLECTION_CONFIRMATION = $t("DELETE_COLLECTION_CONFIRMATION");
  const DELETE_COLLECTION_SUCCESSFULL = $t("DELETE_COLLECTION_SUCCESSFULL");
  const navigate = useNavigate();
  const pageRef = doc(db, `collections/${collection}`);
  const [modules] = useCollection(firebaseCollection(db, "modules"));
  const [state, loading] = useDocumentData(pageRef, [collection], {});
  const handleDelete = async (e: MouseEventHandler<HTMLButtonElement>) => {
    const confirmation = window.confirm(DELETE_COLLECTION_CONFIRMATION);
    if (confirmation) {
      await deleteDoc(pageRef);
      alert(DELETE_COLLECTION_SUCCESSFULL);
      navigate("/dashboard/collections");
    }
  };
  return (
    <Structure>
      <Loader state={!loading}>
        <PageProvider value={state}>
          <CollectionForm
            type="update"
            modules={modules?.docs as Array<Module>}
            onDelete={handleDelete}
            id={collection || null}
          />
        </PageProvider>
      </Loader>
    </Structure>
  );
};

export default Collection;
