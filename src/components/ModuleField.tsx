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
import { Field as FieldInterface } from "interfaces/declarations";

interface FieldProps {
  name: string;
  type: string;
  alias: string;
  order: number;
  index?: number;
  fields: Array<FieldInterface>;
  handleField: Function;
  handleRemoveField: Function;
}

const ModuleField = ({
  name,
  type,
  alias,
  order,
  index,
  fields,
  handleField,
  handleRemoveField,
}: FieldProps): ReactElement => {
  return (
    <Grid
      templateColumns={["1fr", "1fr", "1fr", "2fr 2fr 2fr 2fr 1fr"]}
      gap={5}
      width="100%"
    >
      <GridItem width="100%">
        <FormControl id="name" isRequired>
          <FormLabel as="legend">{$t("FIELD_NAME")}</FormLabel>
          <Input
            size="lg"
            key={`input-props-${index}`}
            type="text"
            isRequired
            autoComplete="false"
            value={name}
            pattern="^[ A-Za-z0-9_@./#&+-]*$"
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
      </GridItem>
      <GridItem>
        <FormControl id="alias" isRequired>
          <FormLabel as="legend">{$t("ALIAS")}</FormLabel>
          <Input
            size="lg"
            key={`input-alias-${index}`}
            type="text"
            isRequired
            autoComplete="false"
            pattern="^[ A-Za-z0-9_@./#&+-]*$"
            value={alias}
            onChange={(e) => {
              e.preventDefault();
              handleField({
                is: "alias",
                value: e.target.value,
                index,
              });
            }}
          />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl id="type" isRequired>
          <FormLabel>{$t("ORDER")}</FormLabel>
          <Select
            size="lg"
            key={`select-${index}`}
            placeholder={$t("ORDER")}
            value={order}
            isRequired
            onChange={(e) => {
              e.preventDefault();
              handleField({
                is: "order",
                value: e.target.value,
                index,
              });
            }}
          >
            {fields.map((_, index) => {
                return (
                  <option value={index} key={index}>
                    {index}
                  </option>
                );
            })}
          </Select>
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl id="type" isRequired>
          <FormLabel>{$t("FIELD_TYPE")}</FormLabel>
          <Select
            size="lg"
            key={`select-${index}`}
            placeholder={$t("SELECT_OPTION")}
            value={type}
            isRequired
            onChange={(e) => {
              e.preventDefault();
              handleField({
                is: "type",
                value: e.target.value,
                index,
              });
            }}
          >
            {Object.entries($t("ELEMENTS")).map(([key, value]) => (
              <option value={key} key={key}>
                {value}
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
            onClick={() => handleRemoveField(index)}
          />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ModuleField;
