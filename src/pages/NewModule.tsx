import React from "react";
import Structure from "layouts/Dashboard";
import ModuleForm from "components/ModuleForm";
import { RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {}

const NewModule = ({}: Props) => {
  return (
    <Structure>
      <ModuleForm
        type="new"
        initialState={{
          name: "",
          alias: "",
          fields: [{ name: "", type: "", alias: "", order: 0 }],
        }}
      />
    </Structure>
  );
};
export default NewModule;
