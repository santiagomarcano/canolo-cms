import React from "react";
import {
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { usePage } from "store/PageContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { devLog } from "utils/developer";
import { $t } from "store/TranslationsContext";
import FieldHeader from "./FieldHeader";

interface Props {
  name: string;
  index: number;
  alias: string;
}

const Text = ({ name, index, alias }: Props) => {
  const [page, dispatch] = usePage();

  const handleChangeText = (state: any) => {
    dispatch({
      type: "MODULE_PROP",
      payload: { name, value: state, index },
    });
  };

  return (
    <Stack width="100%" p={15}>
      <FieldHeader name={name} alias={alias} />
      <Divider />
      <HStack width="100%">
        <FormControl isRequired>
          <FormLabel onMouseEnter={() => devLog(name)}>{$t("TEXT")}</FormLabel>
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
