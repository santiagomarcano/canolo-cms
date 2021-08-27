import React, { ReactElement } from "react";
import {
  FormControl,
  FormLabel,
  Input,
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
  value: string;
}

const ModuleSelector = ({
  handleModule,
  handleRemoveModule,
  options,
  index,
  value,
}: Props): ReactElement => {
  return (
    <Grid templateColumns="32fr 1fr" gap={5} width="100%">
      {/* <GridItem>
        <FormControl id="name" isRequired>
          <FormLabel as="legend">{$t("ORDER")}</FormLabel>
          <Input
            size="lg"
            key={`input-${index}`}
            type="text"
            isRequired
            autoComplete="false"
            value={name}
            onChange={(e) => {
              e.preventDefault();
              handleField({
                is: "name",
                value: e.target.value,
                index,
              });
            }}
          />
        </FormControl>
      </GridItem> */}
      <GridItem>
        <FormControl id="type" isRequired>
          <FormLabel>{$t("MODULE_TYPE")}</FormLabel>
          <Select
            size="lg"
            key={`select-${index}`}
            placeholder={$t("SELECT_OPTION")}
            value={value}
            isRequired
            onChange={(e) => {
              e.preventDefault();
              handleModule({
                is: "type",
                value: e.target.value,
                index,
              });
            }}
          >
            {options.map(({ id }) => (
              <option value={id} key={id}>
                {id}
              </option>
            ))}
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