import React, { FormEvent, ReactElement, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
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
import { Module, PageModule } from "interfaces/declarations";
import ModuleFieldType from "components/ModuleFieldType";
import { usePage } from "store/PageContext";
import Button from "components/Button";
import { useNavigate } from "@reach/router";

interface Props {
  modules: Array<Module>;
  type: string;
}

interface ModuleHandlerEvent {
  value: string;
  index: number;
}

const itemStyles = {
  background: "white",
  p: 4,
  borderRadius: 5,
  width: "100%",
};

const PageForm = ({ modules, type }: Props): ReactElement => {
  const navigate = useNavigate();
  const [page, dispatch] = usePage();
  const [loading, setLoading] = useState(false);
  const MODULES = $t("MODULES")
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
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    await createPage(page);
    setLoading(false);
    navigate("/dashboard/pages");
  }
  return (
    <form onSubmit={handleSubmit}>
      <Wrap>
        <WrapItem {...itemStyles}>
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
        {page?.modules?.length > 0 && (
          <Flex
            width="100%"
            background="white"
            p={4}
            borderRadius={5}
            mt={5}
            display="flex"
            flexDirection="column"
          >
            <Heading as="h4" size="md" mb={5}>
              {MODULES}
            </Heading>
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
                        <ModuleFieldType
                          type={module.component}
                          index={index}
                        />
                      )}
                    </WrapItem>
                  </VStack>
                );
              })}
            </Stack>
          </Flex>
        )}
        <WrapItem {...itemStyles}>
          <Flex justifyContent="space-between" alignItems="center" flex="1">
            <IconButton
              size="lg"
              aria-label={$t("ADD_MODULE")}
              icon={<FiPlus />}
              onClick={handleAddModule}
            />
            <Button
              type="submit"
              label={type === 'new' ? $t("CREAR") : $t("UPDATE")}
              loading={loading}
              disabled={page?.modules?.length === 0 || page?.name === ""}
            ></Button>
          </Flex>
        </WrapItem>
      </Wrap>
    </form>
  );
};

export default PageForm;
