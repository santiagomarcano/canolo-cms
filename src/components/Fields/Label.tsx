import React from "react";
import {
  Flex,
  Text,
  Input,
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  Divider,
  Select,
} from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { usePage } from "store/PageContext";

interface Props {
  name: string;
  index: number;
}

const Label = ({ name, index }: Props) => {
  const [page, dispatch] = usePage();
  const handleChangeText = ({ target }: { target: HTMLInputElement }) => {
    dispatch({
      type: "MODULE_PROP",
      payload: { name, value: target.value, index, key: "content" },
    });
  };
  const handleChangeSize = ({ target }: { target: HTMLSelectElement }) => {
    dispatch({
      type: "MODULE_PROP",
      payload: { name, value: target.value, index, key: "size" },
    });
  };
  return (
    <Stack width="100%" p={15}>
      <Heading as="h4" size="md">
        {name}
      </Heading>
      <Divider />
      <HStack width="100%">
        <FormControl isRequired>
          <FormLabel>{$t("TEXT")}</FormLabel>
          <Input
            value={page.modules[index]?.props[name]?.content || ""}
            onChange={handleChangeText}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>{$t("SIZE")}</FormLabel>
          <Select
            size="lg"
            key={`select-${index}`}
            placeholder={$t("SELECT_OPTION")}
            value={page.modules[index]?.props[name]?.size || ""}
            isRequired
            onChange={handleChangeSize}
          >
            {Array.from($t("SIZES")).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </Select>
        </FormControl>
      </HStack>
    </Stack>
  );
};

export default Label;
