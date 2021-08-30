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

const allowedTypes = ["image/jpeg", "image/png", "image/tiff"];

const Image = ({ name, index, module, alias }: Props) => {
  const [ffmpegState, setFfmpegState] = useFFMPEG();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Overlay
        isOpen={isOpen}
        onClose={onClose}
        headerLabel={$t("MEDIA_GALLERY")}
        cancellable={true}
      >
        <MediaGallery />
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
            h={125}
            borderRadius={5}
            overflow="hidden"
            position="relative"
            opacity={ffmpegState ? 0.2 : 1}
            onClick={onOpen}
          >
            DROP OR CHOOSE
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
