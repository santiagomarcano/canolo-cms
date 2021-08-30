import React, { ReactChild, ReactElement } from "react";
import { CircularProgress, Container, Center, Flex } from "@chakra-ui/react";

interface Props {
  children: any;
  state: any;
  height?: string | number;
}

const Loader = ({ children, state, height = "auto" }: Props) => {
  if (!state) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        height={height}
        width="100%"
      >
        <CircularProgress isIndeterminate />
      </Flex>
    );
  }
  return children;
};

export default Loader;
