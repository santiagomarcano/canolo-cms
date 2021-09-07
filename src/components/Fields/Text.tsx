import React from "react";
import {
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import { usePage } from "store/PageContext";
import "react-quill/dist/quill.snow.css";
import { $t } from "store/TranslationsContext";
import FieldHeader from "./FieldHeader";
import TipTap from "components/TipTap";

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
          <FormLabel>{$t("TEXT")}</FormLabel>
          {/* {page.modules[index]?.props[name] && ( */}
          {/* <EditorContent editor={editor} onChange={handleChangeText} /> */}
          <TipTap content={page.modules[index]?.props[name]} onChange={handleChangeText} />
        </FormControl>
      </HStack>
    </Stack>
  );
};

export default Text;

/*

"<p><strong>VASCO SZINETAR</strong></p><p>LICENCIADO EN CINEMATOGRAFÍA ARTISTA, FOTÓGRAFO, CURADOR DE FOTOGRAFÍA ESPECIALISTA EN ARCHIVOS FOTOGRÁFICOS.</p><p><a href="https://vascoszinetar.com" rel="noopener noreferrer" target="_blank">VASCOSZINETAR.COM</a></p>"
*/
