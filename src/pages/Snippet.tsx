import React, { MouseEventHandler } from "react";
import Structure from "layouts/Dashboard";
import useCollection from "hooks/useCollection";
import Loader from "components/Loader";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "utils/firebase";
import { navigate, RouteComponentProps } from "@reach/router";
import SnippetForm from "components/SnippetForm";
import { PageProvider } from "store/PageContext";
import useDocumentData from "hooks/useDocumentData";
import { $t } from "store/TranslationsContext";

interface PageProps extends RouteComponentProps {
  snippet?: string;
}

const Snippet = ({ snippet }: PageProps) => {
  const DELETE_SNIPPET_CONFIRMATION = $t("DELETE_SNIPPET_CONFIRMATION");
  const DELETE_SNIPPET_SUCCESSFULL = $t("DELETE_SNIPPET_SUCCESSFULL");
  const [modules] = useCollection(collection(db, "modules"));
  const snippetRef = doc(db, `snippets/${snippet}`);
  const [state, loading] = useDocumentData(snippetRef, [snippet], {});
  const handleDelete = async (e: MouseEventHandler<HTMLButtonElement>) => {
    const confirmation = window.confirm(DELETE_SNIPPET_CONFIRMATION);
    if (confirmation) {
      await deleteDoc(snippetRef);
      alert(DELETE_SNIPPET_SUCCESSFULL);
      navigate("/dashboard/pages");
    }
  };
  // Here you're using the same context but handling just index 1 cuz snippets works for just one module
  return (
    <Structure>
      <Loader state={!loading && modules}>
        <PageProvider
          value={{
            name: state.name,
            modules: [
              { component: state.component, visibility: 1, props: state.props },
            ],
            state: "1",
          }}
        >
          <SnippetForm
            type="update"
            modules={modules?.docs as Array<any>}
            id={snippet || null}
          />
        </PageProvider>
      </Loader>
    </Structure>
  );
};

export default Snippet;
