import React, { useRef, useState } from "react";
import {
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import { usePage } from "store/PageContext";
import ReactQuill from "react-quill";
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
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef<any>(null);
  const handleChangeText = (state: any) => {
    dispatch({
      type: "MODULE_PROP",
      payload: { name, value: state, index },
    });
  };
  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: "<p>Hello World! 🌎️</p>",
  // });
  // useEffect(() => {
  //   if (editor) {
  //     editor.on("update", (value: any) => {
  //       console.log("change!!", editor.getHTML());
  //     });
  //   }
  // }, [editor]);
  // console.log("Value is", page.modules);
  // console.log("Editor is", editor);
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
