import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import useCollection from "hooks/useCollection";
import { collection } from "@firebase/firestore";
import { db } from "utils/firebase";
import { usePage } from "store/PageContext";

const SnippetField = ({ index }: { index: number }) => {
  const [snippets] = useCollection(collection(db, "snippets"));
  const [page, dispatch] = usePage();
  const handleChange = ({ target }: { target: HTMLSelectElement }) => {
    dispatch({
      type: "SET_SNIPPET",
      payload: {
        index,
        value: target.value,
        name: snippets.docs.find((doc: any) => doc.id === target.value)?.data()?.name,
      },
    });
  };
  return (
    <>
      <FormControl id="snippet" isRequired>
        <FormLabel>{$t("SELECT_SNIPPET")}</FormLabel>
        <Select
          size="lg"
          placeholder={$t("SELECT_OPTION")}
          value={page.modules[index].id}
          isRequired
          onChange={handleChange}
        >
          {snippets?.docs.map((snippet: any) => (
            <option key={snippet.id} value={snippet.id}>
              {snippet.data().name}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SnippetField;
