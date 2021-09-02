import React from "react";
import {
  Heading,
} from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import { devLog } from "utils/developer";

interface Props {
  name: string | number;
  alias: string | number;
}

const FieldHeader = ({ name, alias }: Props) => {
  return (
    <>
      <Heading
        as="h6"
        size="md"
        onMouseEnter={() => devLog(name)}
        cursor="pointer"
      >
        {alias}
      </Heading>
    </>
  );
};

export default FieldHeader;
