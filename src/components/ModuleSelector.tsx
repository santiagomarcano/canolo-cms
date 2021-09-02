import React, { ReactElement } from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Select,
  IconButton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { FiMinus } from "react-icons/fi";
import { $t } from "store/TranslationsContext";

interface Callback {
  (_?: any): void;
}

interface Props {
  handleModule: Callback;
  handleRemoveModule: Callback;
  options: Array<any>;
  index: number;
  component: string;
  visibility: string | number;
}

const ModuleSelector = ({
  handleModule,
  handleRemoveModule,
  options,
  index,
  component,
  visibility,
}:
Props): ReactElement => {
  return (
    <Grid templateColumns={["10fr 10fr 1fr"]} gap={5} width="100%">
      <GridItem>
        <FormControl id="type" isRequired>
          <FormLabel>{$t("MODULE_TYPE")}</FormLabel>
          <Select
            size="lg"
            key={`select-${index}`}
            placeholder={$t("SELECT_OPTION")}
            value={component}
            isRequired
            onChange={(e) => {
              e.preventDefault();
              if (!e.target.value || e.target.value === "") {
                return;
              }
              handleModule({
                is: "component",
                value: e.target.value,
                index,
              });
            }}
          >
            {options.map((option: any, index: number) => (
              <option value={option.data().meta.name} key={option.id}>
                {option.data().meta.alias}
              </option>
            ))}
          </Select>
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl id="visibility" isRequired>
          <FormLabel>{$t("VISIBILITY")}</FormLabel>
          <Select
            size="lg"
            key={`select-${index}`}
            placeholder={$t("SELECT_OPTION")}
            value={visibility}
            isRequired
            onChange={(e) => {
              e.preventDefault();
              handleModule({
                is: "visibility",
                value: e.target.value,
                index,
              });
            }}
          >
            <option value={1}>{$t("VISIBLE")}</option>
            <option value={0}>{$t("HIDDEN")}</option>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem>
        <FormLabel></FormLabel>
        <Flex flex="1" width="100%" justifyContent="flex-end">
          <IconButton
            mt={6}
            size="lg"
            aria-label="Search database"
            icon={<FiMinus />}
            onClick={() => handleRemoveModule(index)}
          />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ModuleSelector;
