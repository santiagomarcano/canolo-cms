import React, { MouseEventHandler } from "react";
import Structure from "layouts/Dashboard";
import useCollection from "hooks/useCollection";
import Loader from "components/Loader";
import PageForm from "components/PageForm";
import { PageProvider } from "store/PageContext";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "utils/firebase";
import { RouteComponentProps, useNavigate } from "@reach/router";
import useDocumentData from "hooks/useDocumentData";
import { $t } from "store/TranslationsContext";
import { Module } from "interfaces/declarations";

interface PageProps extends RouteComponentProps {
  page?: string;
}

const Page = ({ page }: PageProps) => {
  const DELETE_PAGE_CONFIRMATION = $t("DELETE_PAGE_CONFIRMATION");
  const DELETE_PAGE_SUCCESSFULL = $t("DELETE_PAGE_SUCCESSFULL");
  const navigate = useNavigate();
  const pageRef = doc(db, `pages/${page}`);
  const [modules] = useCollection(collection(db, "modules"));
  const [state, loading] = useDocumentData(pageRef, [page], {});
  const handleDelete = async (e: MouseEventHandler<HTMLButtonElement>) => {
    const confirmation = window.confirm(DELETE_PAGE_CONFIRMATION);
    if (confirmation) {
      await deleteDoc(pageRef);
      alert(DELETE_PAGE_SUCCESSFULL)
      navigate("/dashboard/pages");
    }
  };
  return (
    <Structure>
      <Loader state={!loading}>
        <PageProvider value={state}>
          <PageForm
            type="update"
            modules={modules?.docs as Array<Module>}
            onDelete={handleDelete}
            id={page || null}
          />
        </PageProvider>
      </Loader>
    </Structure>
  );
};

export default Page;
