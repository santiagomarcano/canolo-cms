import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
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
  CircularProgress,
} from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { usePage } from "store/PageContext";
import { resizeBatch } from "utils/ffmpeg";

interface Props {
  name: string;
  index: number;
  module: string;
}

const allowedTypes = ["image/jpeg", "image/png", "image/tiff"];

const Dropzone = ({ name, index, module }: Props) => {

  const IMAGE_TYPES_ALLOWED = $t("IMAGE_TYPES_ALLOWED");
  const [loading, setLoading] = useState(false);
  const [objectURL, setObjectURL] = useState<string | null>(null);
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (allowedTypes.includes(file.type)) {
      setLoading(true);
      try {
        const { images, name: originalName } = await resizeBatch(file);
        const objectURL = URL.createObjectURL(images[0]);
        console.log(file.name);
       
        setObjectURL(objectURL);
        setLoading(false);
      } catch (err) {
        console.error(err)
      }
      return;
    }
    alert(IMAGE_TYPES_ALLOWED);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <Stack width="100%" p={15}>
        <Divider />
        <HStack width="100%">
          <Flex
            justify="space-between"
            align="center"
            textAlign="center"
            cursor="pointer"
            bg="gray.200"
            w={250}
            h={125}
            borderRadius={5}
            overflow="hidden"
            position="relative"
            {...getRootProps()}
          >
            <input
              {...getInputProps()}
              required
              name="image"
              type="file"
              style={{
                display: "inline",
                position: "absolute",
                opacity: 0,
                maxWidth: "100%",
              }}
            />
            {loading ? (
              <Flex justifyContent="center" flex="1">
                <CircularProgress isIndeterminate></CircularProgress>
              </Flex>
            ) : objectURL ? (
              <img src={objectURL} style={{ padding: 20 }} alt={$t("IMG_ALT")} />
            ) : (
              <Text>{$t("DROP_ZONE_TEXT_SINGULAR")}</Text>
            )}
          </Flex>
        </HStack>
      </Stack>
    </>
  );
};

export default Dropzone;