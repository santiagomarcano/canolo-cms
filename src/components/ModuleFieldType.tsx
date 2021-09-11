import React, { useMemo } from "react";
import { Stack, VStack } from "@chakra-ui/react";

interface Props {
  type: any;
  index: number;
  modules: any;
}

const ModuleFieldType = ({ type, index, modules }: Props) => {
  const module = useMemo(
    () => modules.find((module: any) => module.data().meta.name === type)?.data(),
    [type]
  );
  if (!module) {
    return <></>
  }
  return (
    <Stack width="100%">
      {Object.entries(module)
        .filter(([key]) => key !== 'meta')
        .sort((a: any, b: any) => a[1].order - b[1].order)
        .map(([key, value]: [key: string, value: any]) => {
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
                options={value.options}
              />
            </VStack>
          );
        })}
    </Stack>
  );
};

export default ModuleFieldType;
