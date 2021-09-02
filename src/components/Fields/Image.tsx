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
  HStack,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { usePage } from "store/PageContext";
import FieldHeader from "./FieldHeader";
import { useFFMPEG } from "store/FFMPEGProvider";
import Overlay from "components/Overlay";
import MediaGallery from "components/MediaGallery";

interface Props {
  name: string | number;
  alias: string | number;
  index: number;
  module?: string;
}

const Image = ({ name, index, alias }: Props) => {
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
        <Grid width="100%" templateColumns={["1fr 2fr"]} gap={5}>
          <GridItem>
            <Flex
              justify="center"
              align="center"
              textAlign="center"
              cursor={ffmpegState ? "not-allowed" : "pointer"}
              bg="gray.200"
              w="100%"
              h={200}
              borderRadius={5}
              overflow="hidden"
              position="relative"
              opacity={ffmpegState ? 0.2 : 1}
              onClick={onOpen}
            >
              {page.modules[index]?.props[name]?.src ? (
                <>
                  <ChakraImage
                    height="100%"
                    width="100%"
                    objectFit="cover"
                    borderRadius={5}
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
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>{$t("ALT_TEXT")}</FormLabel>
              <Input
                value={page.modules[index]?.props[name]?.alt || ""}
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
        </Grid>
      </Stack>
    </>
  );
};

export default Image;
