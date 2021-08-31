import React from "react";
import {
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { usePage } from "store/PageContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { devLog } from "utils/developer";

interface Props {
  name: string;
  alias: string;
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
