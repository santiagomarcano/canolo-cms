import React from "react";
import Structure from "layouts/Dashboard";
import useCollection from "hooks/useCollection";
import Loader from "components/Loader";
import { collection } from "firebase/firestore";
import { db } from "utils/firebase";
import { RouteComponentProps } from "@reach/router";
import SnippetForm from "components/SnippetForm";
import { PageProvider } from "store/PageContext";

interface PageProps extends RouteComponentProps {}

const NewSnippet = ({}: PageProps) => {
  const [modules] = useCollection(collection(db, "modules"));
  // Here you're using the same context but handling just index 1 cuz snippets works for just one module
  return (
    <Structure>
      <Loader state={modules}>
        <PageProvider
          value={{
            name: "",
            modules: [{ component: "", visibility: 1, props: {} }],
            state: "0",
          }}
        >
          <SnippetForm
            type="new"
            modules={modules?.docs as Array<any>}
            id={null}
          />
        </PageProvider>
      </Loader>
    </Structure>
  );
};

export default NewSnippet;
