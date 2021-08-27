import React from "react";
import {
  HStack,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { usePage } from "store/PageContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  name: string;
  index: number;
}

const Text = ({ name, index }: Props) => {
  const [page, dispatch] = usePage();

  const handleChangeText = (state: any) => {
    dispatch({
      type: "MODULE_PROP",
      payload: { name, value: state, index },
    });
  };

  return (
    <Stack width="100%" p={15}>
      <HStack width="100%">
        <FormControl isRequired>
          <FormLabel>{$t("TEXT")}</FormLabel>
          <ReactQuill
            style={{ borderRadius: 5, border: "2px solid lightgray" }}
            value={page.modules[index]?.props[name] || ""}
            onChange={handleChangeText}
          />
        </FormControl>
      </HStack>
    </Stack>
  );
};

export default Text;
