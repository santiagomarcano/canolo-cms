import React, { useState } from "react";
import {
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { usePage } from "store/PageContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { $t } from "store/TranslationsContext";
import FieldHeader from "./FieldHeader";
import Image from "components/Fields/Image";
import { FiPlus } from "react-icons/fi";

interface Props {
  name: string;
  index: number;
  alias: string;
}

const Images = ({ name, index, alias }: Props) => {
  const [page, dispatch] = usePage();
  const [images, setImages] = useState([{ name: 1, alias: 1 }]);

  const handleChangeText = (state: any) => {
    dispatch({
      type: "MODULE_PROP",
      payload: { name, value: state, index },
    });
  };

  console.log(page);

  const handleAddImage = () => {
    setImages((images) => {
      const next = [...images];
      next.push({
        name: images[images.length - 1].name + 1,
        alias: images[images.length - 1].alias + 1,
      });
      return next;
    });
  };

  return (
    <Stack width="100%" p={15}>
      <FieldHeader name={name} alias={alias} />
      <Divider />
      <HStack width="100%">
        <FormControl isRequired>
          {images.map((image, index) => (
            <Image
              key={index}
              index={index}
              name={+image.name}
              alias={image.alias}
            />
          ))}
        </FormControl>
      </HStack>
      <IconButton
        size="lg"
        aria-label={$t("ADD_MODULE")}
        icon={<FiPlus />}
        onClick={handleAddImage}
      />
    </Stack>
  );
};

export default Images;
