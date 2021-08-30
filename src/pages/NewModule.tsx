import React from "react";
import Structure from "layouts/Dashboard";
import ModuleForm from "components/ModuleForm";
import { RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {}

const NewModule = ({}: Props) => {
        return (
    <Structure>
      <ModuleForm />
    </Structure>
  );
}
export default NewModule