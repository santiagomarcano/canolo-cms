import React, { FormEvent, ReactElement, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  IconButton,
  Wrap,
  WrapItem,
  Heading,
  Stack,
  VStack,
} from "@chakra-ui/react";
import ModuleSelector from "components/ModuleSelector";
import { FiPlus } from "react-icons/fi";
import { $t } from "store/TranslationsContext";
import { createPage } from "utils/adapter";
import { onClose, Module, PageModule } from "interfaces/declarations";
import ModuleFieldType from "components/ModuleFieldType";
import { usePage } from "store/PageContext";

interface Props {
  onClose: onClose;
  modules: Array<Module>;
}

interface ModuleHandlerEvent {
  value: string;
  index: number;
}

const PageForm = ({ modules }: Props): ReactElement => {
  const [page, dispatch] = usePage();
  console.log(page);
  const handleAddModule = () => {
    dispatch({ type: "ADD_MODULE" });
  };
  const handleModule = ({ value, index }: ModuleHandlerEvent) => {
    dispatch({ type: "MODULE", payload: { index, value } });
  };
  const handleRemoveModule = (index: number) => {
    dispatch({ type: "REMOVE_MODULE", payload: { index } });
  };
  const handleChangePageName = ({ target }: { target: HTMLInputElement }) => {
    dispatch({ type: "PAGE_NAME", payload: { value: target.value } });
  };
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    await createPage(page);
    // onClose();
  }
  return (
    <form onSubmit={handleSubmit}>
      <Wrap>
        <WrapItem width="100%">
          <FormControl isRequired width="100%">
            <FormLabel>{$t("PAGE_NAME")}</FormLabel>
            <Input
              key="page-name"
              size="lg"
              type="text"
              isRequired
              autoComplete="false"
              value={page.name}
              onChange={handleChangePageName}
            />
          </FormControl>
        </WrapItem>
        <WrapItem width="100%">
          <Heading as="h4" size="md" mt={5}>
            {$t("MODULES")}
          </Heading>
        </WrapItem>
        <Stack>
          {page.modules.map((module: PageModule, index: number) => {
            return (
              <VStack
                key={`${module}-${index}`}
                border="1px solid"
                borderColor="gray.200"
                padding="5"
                borderRadius="5"
              >
                <WrapItem key={index} width="100%">
                  <ModuleSelector
                    options={modules}
                    handleModule={handleModule}
                    handleRemoveModule={handleRemoveModule}
                    index={index}
                    value={module.component}
                  />
                </WrapItem>
                <WrapItem width="100%">
                  {module && (
                    <ModuleFieldType type={module.component} index={index} />
                  )}
                </WrapItem>
              </VStack>
            );
          })}
        </Stack>
        <WrapItem width="100%">
          <Flex justifyContent="space-between" alignItems="center" flex="1">
            <IconButton
              size="lg"
              mt={5}
              aria-label={$t("ADD_MODULE")}
              icon={<FiPlus />}
              onClick={handleAddModule}
            />
            <Button mt={5} type="submit" size="lg">
              {$t("CREATE")}
            </Button>
          </Flex>
        </WrapItem>
      </Wrap>
    </form>
  );
};

export default PageForm;
