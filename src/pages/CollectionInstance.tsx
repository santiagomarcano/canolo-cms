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
import CollectionInstanceForm from "components/CollectionInstanceForm";

interface PageProps extends RouteComponentProps {
  collection?: string;
  id?: string;
  location?: any;
}

const CollectionInstance = ({ collection, id, location }: PageProps) => {
  const DELETE_COLLECTION_CONFIRMATION = $t("DELETE_COLLECTION_CONFIRMATION");
  const DELETE_COLLECTION_SUCCESSFULL = $t("DELETE_COLLECTION_SUCCESSFULL");
  const navigate = useNavigate();
  const pageRef = doc(db, `${collection}/${id}`);
  const [modules] = useCollection(firebaseCollection(db, "modules"));
  const [state, loading] = useDocumentData(pageRef, [collection], {});
  const [{ categories }, loadingCategories] = useDocumentData(
    doc(db, "categories/value"),
    [],
    { initialValue: {} }
  );
  const handleDelete = async (e: MouseEventHandler<HTMLButtonElement>) => {
    const confirmation = window.confirm(DELETE_COLLECTION_CONFIRMATION);
    if (confirmation) {
      await deleteDoc(pageRef);
      alert(DELETE_COLLECTION_SUCCESSFULL);
      navigate(`/dashboard/${collection}`);
    }
  };
  return (
    <Structure name={state?.name}>
      <Loader state={!loading && !loadingCategories}>
        <PageProvider value={state}>
          <CollectionInstanceForm
            type="update"
            categories={categories}
            modules={modules?.docs as Array<Module>}
            onDelete={handleDelete}
            id={id || null}
            collectionId={collection || ""}
          />
        </PageProvider>
      </Loader>
    </Structure>
  );
};

export default CollectionInstance;
