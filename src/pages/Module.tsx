import React from "react";
import Structure from "layouts/Dashboard";
import ModuleForm from "components/ModuleForm";
import { RouteComponentProps } from "@reach/router";
import useDocumentData from "hooks/useDocumentData";
import { doc } from "firebase/firestore";
import { db } from "utils/firebase";
import Loader from "components/Loader";
import { Field } from "interfaces/declarations";

interface Props extends RouteComponentProps {
  module?: string;
}

const formatFields = (fields: any) => {
  return Object.keys(fields).map((key) => ({
    name: key,
    alias: fields[key]?.alias,
    type: fields[key]?.type,
  }));
};

const Module = ({ path, module }: Props) => {
  const [state, loading] = useDocumentData(doc(db, `modules/${module}`), [
    path,
  ]);
  return (
    <Structure>
      <Loader state={!loading}>
        <ModuleForm
        type="update"
          initialState={{
            name: module || "",
            fields: formatFields(state),
          }}
        />
      </Loader>
    </Structure>
  );
};
export default Module;
