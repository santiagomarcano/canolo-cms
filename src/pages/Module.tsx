import React, { MouseEventHandler } from "react";
import Structure from "layouts/Dashboard";
import ModuleForm from "components/ModuleForm";
import { RouteComponentProps, useNavigate } from "@reach/router";
import useDocumentData from "hooks/useDocumentData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "utils/firebase";
import Loader from "components/Loader";
import { Field } from "interfaces/declarations";
import { $t } from "store/TranslationsContext";

interface Props extends RouteComponentProps {
  module?: string;
}

const formatFields = (fields: any) => {
  return Object.keys(fields).map((key) => ({
    name: key,
    alias: fields[key]?.alias,
    type: fields[key]?.type,
    order: fields[key].order,
  }));
};

const Module = ({ path, module }: Props) => {
  console.log('MODULE IS', module)
  const DELETE_MODULE_CONFIRMATION = $t("DELETE_MODULE_CONFIRMATION");
  const DELETE_MODULE_SUCCESSFULL = $t("DELETE_MODULE_SUCCESSFULL");
  const navigate = useNavigate();
  const moduleRef = doc(db, `modules/${module}`);
  const [state, loading] = useDocumentData(moduleRef, [path], { initialValue: {} });
  const handleDelete = async (e: MouseEventHandler<HTMLButtonElement>) => {
    const confirmation = window.confirm(DELETE_MODULE_CONFIRMATION);
    if (confirmation) {
      await deleteDoc(moduleRef);
      alert(DELETE_MODULE_SUCCESSFULL);
      navigate("/dashboard/modules");
    }
  };
  return (
    <Structure>
      <Loader state={!loading}>
        <ModuleForm
          type="update"
          onDelete={handleDelete}
          initialState={{
            id: module || null,
            name:  state?.meta?.name,
            alias: state?.meta?.alias,
            fields: formatFields(state),
          }}
          isEdit
        />
      </Loader>
    </Structure>
  );
};
export default Module;
