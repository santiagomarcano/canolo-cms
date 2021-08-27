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
} from "@chakra-ui/react";
import ModuleField from "components/ModuleField";
import { FiPlus } from "react-icons/fi";
import { $t } from "store/TranslationsContext";
import { createSchema } from "utils/adapter";
import { onClose, Field as FieldInterface } from "interfaces/declarations";

const ModuleForm = ({ onClose }: { onClose: onClose }): ReactElement => {
  const [schema, setSchema] = useState({
    name: "",
    fields: [{ name: "", type: "" }],
  });
  const handleAddField = () => {
    setSchema((current) => {
      const next = [...current.fields, { name: "", type: "" }];
      return {
        ...current,
        fields: next,
      };
    });
  };
  const handleField = ({
    is,
    value,
    index,
  }: {
    is: string;
    value: string;
    index: number;
  }): void => {
    const field: any = schema.fields[index];
    field[is] = value;
    const next = [...schema.fields];
    next[index] = field;
    setSchema({ ...schema, fields: next });
  };
  const handleRemoveField = (index: number) => {
    setSchema((current) => {
      if (current.fields.length > 1) {
        return {
          ...current,
          fields: current.fields.filter((_, i) => i !== index),
        };
      }
      return current;
    });
  };
  const handleChangeSchemaName = ({ target }: { target: HTMLInputElement }) => {
    setSchema((schema) => {
      const next = { ...schema };
      next.name = target.value;
      return next;
    });
  };
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    await createSchema(schema);
    onClose();
  }
  return (
    <form onSubmit={handleSubmit}>
      <Wrap>
        <WrapItem width="100%">
          <FormControl isRequired width="100%">
            <FormLabel>{$t("MODULE_NAME")}</FormLabel>
            <Input
              size="lg"
              type="text"
              isRequired
              autoComplete="false"
              value={schema.name}
              onChange={handleChangeSchemaName}
            />
          </FormControl>
        </WrapItem>
        <WrapItem width="100%">
          <Heading as="h4" size="md" mt={5}>
            {$t("FIELDS")}
          </Heading>
        </WrapItem>
        {schema.fields.map((field: FieldInterface, index: number) => (
          <WrapItem key={index} width="100%">
            <ModuleField
              handleField={handleField}
              handleRemoveField={handleRemoveField}
              index={index}
              {...field}
            />
          </WrapItem>
        ))}
        <WrapItem width="100%">
          <Flex justifyContent="space-between" alignItems="center" flex="1">
            <IconButton
              size="lg"
              mt={5}
              aria-label={$t("ADD_FIELD")}
              icon={<FiPlus />}
              onClick={handleAddField}
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

export default ModuleForm;
