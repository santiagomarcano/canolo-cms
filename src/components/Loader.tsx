import React, { ReactElement } from "react";
import {
  CircularProgress,
  Container,
  Center,
} from "@chakra-ui/react";

interface Props {
  children: ReactElement;
  state: any;
}

const Loader = ({ children, state }: Props) => {
  if (!state) {
    return (
      <Container height="100%" centerContent={true}>
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      </Container>
    );
  }
  return children
};

export default Loader;