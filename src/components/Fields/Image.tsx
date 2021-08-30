import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Flex,
  Text,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Divider,
  CircularProgress,
  VStack,
} from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { usePage } from "store/PageContext";
import { resizeBatch } from "utils/ffmpeg";
import FieldHeader from "./FieldHeader";
import { useFFMPEG } from "store/FFMPEGProvider";

interface Props {
  name: string;
  index: number;
  module: string;
  alias: string;
}

const allowedTypes = ["image/jpeg", "image/png", "image/tiff"];

const Image = ({ name, index, module, alias }: Props) => {
  const [ffmpegState, setFfmpegState] = useFFMPEG();
  console.log(ffmpegState);
  const [page, dispatch] = usePage();
  const IMAGE_TYPES_ALLOWED = $t("IMAGE_TYPES_ALLOWED");
  const [loading, setLoading] = useState(false);
  const [objectURL, setObjectURL] = useState<string | null>(null);
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (allowedTypes.includes(file.type)) {
      setFfmpegState(true);
      setLoading(true);
      try {
        const { images, name: originalName } = await resizeBatch(file);
        const objectURL = URL.createObjectURL(images[0]);
        dispatch({
          type: "MODULE_PROP_IMAGE",
          payload: {
            name,
            value: originalName,
            index,
            key: "src",
            images,
            module,
          },
        });
        setObjectURL(objectURL);
        setFfmpegState(false);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
      return;
    }
    alert(IMAGE_TYPES_ALLOWED);
  }, []);
  const onChange = ({ target }: { target: HTMLInputElement }) => {
    dispatch({
      type: "MODULE_PROP",
      payload: { name, value: target.value, index, key: "alt" },
    });
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <Stack width="100%" p={15}>
        <FieldHeader name={name} alias={alias} />
        <Divider />
        <VStack width="100%">
          <Flex
            justify="center"
            align="center"
            textAlign="center"
            cursor={ffmpegState ? "not-allowed" : "pointer"}
            bg="gray.200"
            w="100%"
            h={125}
            borderRadius={5}
            overflow="hidden"
            position="relative"
            opacity={ffmpegState ? 0.2 : 1}
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
                cursor: ffmpegState ? "not-allowed" : "pointer"
              }}
              disabled={ffmpegState}
            />
            {loading ? (
              <Flex justifyContent="center" flex="1">
                <CircularProgress isIndeterminate></CircularProgress>
              </Flex>
            ) : objectURL ? (
              <img
                src={objectURL}
                style={{ padding: 20 }}
                alt={$t("IMG_ALT")}
              />
            ) : (
              <Text>{$t("DROP_ZONE_TEXT_SINGULAR")}</Text>
            )}
          </Flex>
          <FormControl isRequired>
            <FormLabel>{$t("ALT_TEXT")}</FormLabel>
            <Input
              value={page.modules[index]?.props[name]?.alt || ""}
              onChange={onChange}
            />
          </FormControl>
        </VStack>
      </Stack>
    </>
  );
};

export default Image;
