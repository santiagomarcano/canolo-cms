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
  useDisclosure,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { usePage } from "store/PageContext";
import { resizeBatch } from "utils/ffmpeg";
import FieldHeader from "./FieldHeader";
import { useFFMPEG } from "store/FFMPEGProvider";
import Overlay from "components/Overlay";
import MediaGallery from "components/MediaGallery";

interface Props {
  name: string;
  index: number;
  module: string;
  alias: string;
}

const Image = ({ name, index, module, alias }: Props) => {
  const [ffmpegState] = useFFMPEG();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, dispatch] = usePage();
  const handleChange = ({ target }: { target: HTMLInputElement }) => {
    dispatch({
      type: "MODULE_PROP",
      payload: { name, value: target.value, index, key: "alt" },
    });
  };

  const handleGallery = (selected: any) => {
    console.log(selected);
    dispatch({
      type: "MODULE_PROP",
      payload: { name, value: selected, index, key: "src" },
    });
  };
  return (
    <>
      <Overlay
        isOpen={isOpen}
        onClose={onClose}
        headerLabel={$t("MEDIA_GALLERY")}
        cancellable={ffmpegState}
        size="2xl"
      >
        <MediaGallery
          multiple={false}
          selected={page.modules[index]?.props[name]?.src || ""}
          onSelect={handleGallery}
          onClose={onClose}
        />
      </Overlay>
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
            h={300}
            borderRadius={5}
            overflow="hidden"
            position="relative"
            opacity={ffmpegState ? 0.2 : 1}
            onClick={onOpen}
          >
            {page.modules[index]?.props[name]?.src ? (
              <>
                <ChakraImage
                  height={300}
                  src={page.modules[index]?.props[name]?.src.replace(
                    "{size}",
                    "300"
                  )}
                  crossOrigin="anonymous"
                />
              </>
            ) : (
              <Text>{$t("CHOOSE_IMAGE")}</Text>
            )}
          </Flex>
          <FormControl isRequired>
            <FormLabel>{$t("ALT_TEXT")}</FormLabel>
            <Input
              value={page.modules[index]?.props[name]?.alt || ""}
              onChange={handleChange}
            />
          </FormControl>
        </VStack>
      </Stack>
    </>
  );
};

export default Image;
