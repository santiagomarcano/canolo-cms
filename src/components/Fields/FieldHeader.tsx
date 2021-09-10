import React from "react";
import { Heading } from "@chakra-ui/react";
import { devLog } from "utils/developer";

interface Props {
  name: string | number;
  alias: string | number;
  size?: string;
}

const FieldHeader = ({ name, alias, size = "md" }: Props) => {
  return (
    <>
      <Heading
        as="h6"
        size={size}
        onMouseEnter={() => devLog(name)}
        cursor="pointer"
      >
        {alias}
      </Heading>
    </>
  );
};

export default FieldHeader;
