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
  GridItem,
  Grid,
  Stack,
  VStack,
} from "@chakra-ui/react";
import ModuleSelector from "components/ModuleSelector";
import { FiPlus } from "react-icons/fi";
import { $t } from "store/TranslationsContext";
import { createSnippet } from "utils/adapter";
import { Module } from "interfaces/declarations";
import { usePage as useCollection, usePage } from "store/PageContext";
import Button from "components/Button";
import { useNavigate } from "@reach/router";
import ModuleFieldType from "./ModuleFieldType";

interface Props {
  modules: Array<Module>;
  type: string;
  onDelete?: any;
  id: string | null;
}

interface ModuleHandlerEvent {
  value: string;
  index: number;
  is: string;
}

const itemStyles = {
  background: "white",
  p: 4,
  borderRadius: 5,
  width: "100%",
};

const SnippetForm = ({
  modules,
  type,
  onDelete,
  id = null,
}: Props): ReactElement => {
  const [snippet, dispatch] = usePage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleModule = ({ value, index, is }: ModuleHandlerEvent) => {
    dispatch({ type: "MODULE", payload: { index, value, is } });
  };

  const handleChangeSnippetName = ({
    target,
  }: {
    target: HTMLInputElement;
  }) => {
    dispatch({ type: "PAGE_NAME", payload: { value: target.value } });
  };

  function handleRemoveModule() {}

  async function handleSubmit(e: FormEvent) {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    await createSnippet({ snippet, id });
    setLoading(false);
    navigate("/dashboard/snippets");
  }
  return (
    <form onSubmit={handleSubmit}>
      <Wrap {...itemStyles}>
        <Grid templateColumns={["1fr"]} width="100%" gap={2}>
          <GridItem>
            <FormControl isRequired width="100%">
              <FormLabel>{$t("COLLECTION_NAME")}</FormLabel>
              <Input
                key="page-name"
                size="lg"
                type="text"
                isRequired
                autoComplete="false"
                value={snippet.name}
                onChange={handleChangeSnippetName}
              />
            </FormControl>
          </GridItem>
          <GridItem gridColumnStart={1}>
            <ModuleSelector
              options={modules}
              handleModule={handleModule}
              handleRemoveModule={handleRemoveModule}
              component={snippet.modules[0].component}
              visibility={snippet.modules[0].visibility}
              index={0}
              canRemove={false}
              showVisibility={false}
            />
          </GridItem>
        </Grid>
        <ModuleFieldType
          type={snippet.modules[0].component}
          modules={modules}
          index={0}
        />
        <Flex justifyContent="flex-end" alignItems="center" flex="1">
          <Button
            type="submit"
            label={type === "new" ? $t("CREATE") : $t("UPDATE")}
            loading={loading}
            disabled={snippet?.modules?.length === 0 || snippet?.name === ""}
            colorScheme="green"
            mt={4}
          ></Button>
        </Flex>
      </Wrap>
    </form>
  );
};

export default SnippetForm;
