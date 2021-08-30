import React from "react";
import { CircularProgress, Flex, Stack, VStack } from "@chakra-ui/react";
import { db } from "utils/firebase";
import { doc } from "firebase/firestore";
import useDocumentData from "hooks/useDocumentData";

interface Props {
  type: string;
  index: number;
}

const ModuleFieldType = ({ type, index }: Props) => {
  const [fields, loading] = useDocumentData(doc(db, `modules/${type}`), [type]);
  if (loading) {
    return (
      <Flex width="100%" justifyContent="center">
        <CircularProgress isIndeterminate />
      </Flex>
    );
  }
  return (
    <Stack width="100%">
      {Object.entries(fields).map(([key, value]: [key: string, value: any]) => {
        const {
          default: Component,
        } = require(`components/Fields/${value.type}.tsx`);
        return (
          <VStack
            key={key}
            width="100%"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="5"
          >
            <Component
              name={key}
              alias={value.alias}
              index={index}
              module={value.type}
            />
          </VStack>
        );
      })}
    </Stack>
  );
};

export default ModuleFieldType;
