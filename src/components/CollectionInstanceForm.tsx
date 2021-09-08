import React, { FormEvent, ReactElement, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Wrap,
  WrapItem,
  Heading,
  Select,
  GridItem,
  Grid,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import ModuleSelector from "components/ModuleSelector";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { $t } from "store/TranslationsContext";
import { createCollectionPage } from "utils/adapter";
import { Module } from "interfaces/declarations";
import ModuleFieldType from "components/ModuleFieldType";
import { usePage } from "store/PageContext";
import Button from "components/Button";
import { useNavigate } from "@reach/router";

interface Props {
  modules: Array<Module>;
  type: string;
  onDelete?: any;
  id: string | null;
  collectionId: string;
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

const getAlias = (module: any, modules: any) => {
  return modules
    .find((m: any) => module.component === m?.data().meta.name)
    ?.data().meta?.alias;
};

const CollectionInstanceForm = ({
  modules,
  type,
  onDelete,
  id = null,
  collectionId,
}: Props): ReactElement => {
  const navigate = useNavigate();
  const [page, dispatch] = usePage();
  const [loading, setLoading] = useState(false);
  const MODULES = $t("MODULES");
  const SELECT_MODULE = $t("SELECT_MODULE");
  const handleModule = ({ value, index, is }: ModuleHandlerEvent) => {
    dispatch({ type: "MODULE", payload: { index, value, is } });
  };
  const handleRemoveModule = (index: number) => {
    dispatch({ type: "REMOVE_MODULE", payload: { index } });
  };
  const handleChangePageName = ({ target }: { target: HTMLInputElement }) => {
    dispatch({ type: "PAGE_NAME", payload: { value: target.value } });
  };
  const handleStateChange = ({ target }: { target: HTMLSelectElement }) => {
    dispatch({ type: "PAGE_STATUS", payload: { value: target.value } });
  };
  async function handleSubmit(e: FormEvent) {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    await createCollectionPage({ page, id, collectionId });
    setLoading(false);
    navigate(`/dashboard/${collectionId}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <Wrap>
        <WrapItem {...itemStyles}>
          <Grid templateColumns={["repeat(2, 1fr)"]} width="100%" gap={2}>
            <GridItem>
              <FormControl isRequired width="100%">
                <FormLabel>{$t("PAGE_NAME")}</FormLabel>
                <Input
                  key="page-name"
                  size="lg"
                  type="text"
                  isRequired
                  autoComplete="false"
                  value={page.name}
                  pattern="^[ A-Za-z0-9]*$"
                  onChange={handleChangePageName}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired width="100%">
                <FormLabel>{$t("STATE")}</FormLabel>
                <Select
                  size="lg"
                  onChange={handleStateChange}
                  value={page.state || 0}
                >
                  <option value={0}>{$t("DRAFT")}</option>
                  <option value={1}>{$t("PUBLISHED")}</option>
                </Select>
              </FormControl>
            </GridItem>
            {/* <GridItem gridColumnStart={1} gridColumnEnd={3}>
              <FormControl isRequired width="100%">
                <FormLabel>{$t("SLUG")}</FormLabel>
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
            </GridItem> */}
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
          <Accordion allowToggle width="100%" size="lg">
            {page.modules?.length > 0 && (
              <>
                {page?.modules.map((module: any, index: number) => (
                  <AccordionItem
                    key={index}
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius={5}
                    background="gray.50"
                    my={2}
                  >
                    <h2>
                      <AccordionButton
                        _expanded={{
                          bg: "green",
                          color: "white",
                          borderWidth: 1,
                          borderColor: "gray.200",
                          borderBottomEndRadius: 0,
                          borderBottomStartRadius: 0,
                        }}
                        _focus={{
                          borderWidth: 0,
                        }}
                        height={50}
                        fontSize={18}
                        borderRadius={5}
                      >
                        <Box flex="1" textAlign="left">
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            {getAlias(module, modules) || SELECT_MODULE}
                            <Box mr={2}>
                              {Number(module.visibility) ? (
                                <FiEye />
                              ) : (
                                <FiEyeOff />
                              )}
                            </Box>
                          </Flex>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel background="gray.50">
                      <Wrap>
                        <WrapItem key={index} width="100%">
                          <ModuleSelector
                            options={modules}
                            handleModule={handleModule}
                            handleRemoveModule={handleRemoveModule}
                            index={index}
                            component={module.component}
                            visibility={module.visibility}
                            canRemove={false}
                          />
                        </WrapItem>
                        <WrapItem width="100%">
                          {module && (
                            <ModuleFieldType
                              type={module.component}
                              modules={modules}
                              index={index}
                            />
                          )}
                        </WrapItem>
                      </Wrap>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </>
            )}
          </Accordion>
        </WrapItem>
        <WrapItem {...itemStyles}>
          <Flex justifyContent="space-between" alignItems="center" flex="1">
            <div></div>
            <div>
              {id && (
                <Button
                  type="button"
                  label={$t("DELETE_PAGE")}
                  onClick={onDelete}
                  mr={2}
                  colorScheme="red"
                ></Button>
              )}
              <Button
                type="submit"
                label={type === "new" ? $t("CREATE") : $t("UPDATE")}
                loading={loading}
                disabled={page?.modules?.length === 0 || page?.name === ""}
                colorScheme="green"
              ></Button>
            </div>
          </Flex>
        </WrapItem>
      </Wrap>
    </form>
  );
};

export default CollectionInstanceForm;
