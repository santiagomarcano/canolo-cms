import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { FiEyeOff } from "react-icons/fi";

interface NotFoundProps extends RouteComponentProps {
  navigate?: any;
}

const NotFound = ({ navigate }: NotFoundProps) => {
  const [counter, setCounter] = useState(3);
  useEffect(() => {
    setTimeout(() => {
      setCounter((current: number): any => {
        if (current > 0) {
          return current - 1;
        }
        navigate("/");
      });
    }, 1000);
  }, [counter]);
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      flexDirection="column"
    >
      <FiEyeOff />
      <Text as="h2" fontSize="xl" fontWeight="bold">
        {$t("PAGE_NOT_FOUND")}
      </Text>
      <Text as="h3" fontSize="lg">
        {$t("REDIRECT_IN")} {counter}
      </Text>
    </Flex>
  );
};

export default NotFound;
