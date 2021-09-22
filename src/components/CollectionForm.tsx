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
import { createCollection } from "utils/adapter";
import { Module } from "interfaces/declarations";
import { usePage as useCollection } from "store/PageContext";
import Button from "components/Button";
import { useNavigate } from "@reach/router";

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

const CollectionForm = ({
  modules,
  type,
  onDelete,
  id = null,
}: Props): ReactElement => {
  const navigate = useNavigate();
  const [collection, dispatch] = useCollection();
  const [loading, setLoading] = useState(false);
  const MODULES = $t("MODULES");
  const handleAddModule = () => {
    dispatch({ type: "ADD_MODULE" });
  };
  const handleModule = ({ value, index, is }: ModuleHandlerEvent) => {
    dispatch({ type: "MODULE", payload: { index, value, is } });
  };
  const handleRemoveModule = (index: number) => {
    dispatch({ type: "REMOVE_MODULE", payload: { index } });
  };
  const handleChangeCollectionName = ({
    target,
  }: {
    target: HTMLInputElement;
  }) => {
    dispatch({ type: "PAGE_NAME", payload: { value: target.value } });
  };
  const handleChangeCollectionSlug = ({
    target,
  }: {
    target: HTMLInputElement;
  }) => {
    dispatch({ type: "PAGE_SLUG", payload: { value: target.value } });
  };
  async function handleSubmit(e: FormEvent) {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    await createCollection({ structure: collection, id });
    setLoading(false);
    navigate("/dashboard/collections");
  }
  return (
    <form onSubmit={handleSubmit}>
      <Wrap>
        <WrapItem {...itemStyles}>
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
                  value={collection.name}
                  onChange={handleChangeCollectionName}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired width="100%">
                <FormLabel>{$t("COLLECTION_SLUG")}</FormLabel>
                <Input
                  key="page-slug"
                  size="lg"
                  type="text"
                  isRequired
                  autoComplete="false"
                  value={collection.slug}
                  onChange={handleChangeCollectionSlug}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </WrapItem>
        <WrapItem
          width="100%"
          background="white"
          m={0}
          display="block"
          p={4}
          borderRadius={5}
        >
          <Heading as="h4" size="md" mb={5}>
            {MODULES}
          </Heading>
          <Stack>
            {collection.modules?.length > 0 && (
              <>
                {collection?.modules.map((module: any, index: number) => (
                  <VStack key={index}>
                    <ModuleSelector
                      options={modules}
                      handleModule={handleModule}
                      handleRemoveModule={handleRemoveModule}
                      index={index}
                      component={module.component}
                      showVisibility={false}
                      visibility={module.visibility}
                    />
                  </VStack>
                ))}
              </>
            )}
          </Stack>
        </WrapItem>
        <WrapItem {...itemStyles}>
          <Flex justifyContent="space-between" alignItems="center" flex="1">
            <IconButton
              size="lg"
              aria-label={$t("ADD_MODULE")}
              icon={<FiPlus />}
              onClick={handleAddModule}
            />
            <div>
              {id && (
                <Button
                  type="button"
                  label={$t("DELETE_COLLECTION")}
                  onClick={onDelete}
                  mr={2}
                  colorScheme="red"
                ></Button>
              )}
              <Button
                type="submit"
                label={type === "new" ? $t("CREATE") : $t("UPDATE")}
                loading={loading}
                disabled={
                  collection?.modules?.length === 0 || collection?.name === ""
                }
                colorScheme="green"
              ></Button>
            </div>
          </Flex>
        </WrapItem>
      </Wrap>
    </form>
  );
};

export default CollectionForm;
