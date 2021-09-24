import React from "react";
import {
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Divider,
  Select,
} from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { usePage } from "store/PageContext";
import FieldHeader from "./FieldHeader";
import { collection } from "firebase/firestore";
import useCollection from "hooks/useCollection";
import { db } from "utils/firebase";
import Autocomplete from "./Autocomplete";

interface Props {
  name: string;
  index: number;
  alias: string;
  values?: Array<string>;
  relation: {
    id: string;
    name: string;
  };
}

const Relation = ({ name, index, alias, values, relation }: Props) => {
  const [items] = useCollection(collection(db, relation.id), {
    docs: [],
  });
  const [page, dispatch] = usePage();
  const handleChangeValue = (value: string) => {
    dispatch({
      type: "MODULE_PROP",
      payload: { name, value, index },
    });
  };
  if (!relation) {
    return <div>No se puede relacionar una colección sin registros</div>
  }
  return (
    <Stack width="100%" p={15}>
      <FieldHeader name={name} alias={alias} />
      <HStack width="100%">
        <FormControl isRequired>
          <Autocomplete
            name=""
            alias=""
            onChange={handleChangeValue}
            values={items.docs.map((item: any) => item.data().name)}
            selected={page.modules[index]?.props[name]}
            placeholder={$t("CHOOSE_RELATIONS")}
            label={$t("CHOOSE_RELATIONS")}
            noSelectedLabel={$t("NO_RELATIONS")}
          />
        </FormControl>
      </HStack>
    </Stack>
  );
};

export default Relation;
