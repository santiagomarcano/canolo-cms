import React from "react";
import {
  Input,
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { usePage } from "store/PageContext";
import FieldHeader from "./FieldHeader";

interface Props {
  name: string;
  index: number;
  alias: string;
}

const HREF = ({ name, index, alias }: Props) => {
  const [page, dispatch] = usePage();
  const handleChangeText = ({ target }: { target: HTMLInputElement }) => {
    dispatch({
      type: "MODULE_PROP",
      payload: { name, value: target.value, index },
    });
  };
  return (
    <Stack width="100%" p={15}>
      <FieldHeader name={name} alias={alias} />
      <Divider />
      <HStack width="100%">
        <FormControl isRequired>
          <FormLabel>{$t("HREF")}</FormLabel>
          <Input
            value={page.modules[index]?.props[name] || ""}
            onChange={handleChangeText}
          />
        </FormControl>
      </HStack>
    </Stack>
  );
};

export default HREF;
