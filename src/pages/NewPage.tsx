import React from "react";
import Structure from "layouts/Dashboard";
import useCollection from "hooks/useCollection";
import Loader from "components/Loader";
import PageForm from "components/PageForm";
import { PageProvider } from "store/PageContext";
import { collection } from "firebase/firestore";
import { db } from "utils/firebase";
import { RouteComponentProps } from "@reach/router";

interface PageProps extends RouteComponentProps {}

const NewPage = ({}: PageProps) => {
  const [modules] = useCollection(collection(db, "modules"));
  return (
    <Structure>
      <Loader state={modules}>
        <PageProvider value={{ name: "", modules: [], state: "0", categories: [] }}>
          <PageForm
            type="new"
            modules={modules?.docs as Array<any>}
            id={null}
          />
        </PageProvider>
      </Loader>
    </Structure>
  );
};

export default NewPage;
