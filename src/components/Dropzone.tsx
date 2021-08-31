import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Flex,
  Text,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { resizeBatch, sizes } from "utils/ffmpeg";
import { useFFMPEG } from "store/FFMPEGProvider";
import { storage } from "utils/firebase";
import { ref, uploadBytes } from "firebase/storage";

interface Props {
  onUploadFinished: Function;
}

const allowedTypes = ["image/jpeg", "image/png", "image/tiff"];

const Dropzone = ({ onUploadFinished }: Props) => {
  const [ffmpegState, setFfmpegState] = useFFMPEG();
  const IMAGE_TYPES_ALLOWED = $t("IMAGE_TYPES_ALLOWED");
  const [loading, setLoading] = useState(false);
  const [progressPhase, setProgressPhase] = useState("");
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (allowedTypes.includes(file.type)) {
      setFfmpegState(true);
      setLoading(true);
      try {
        setProgressPhase("resizing");
        const { images, name: originalName } = await resizeBatch({
          file,
        });
        const promises = [];
        for (let image of images) {
          const storageRef = ref(storage, `images/${image.name}`);
          promises.push(
            uploadBytes(storageRef, image, {
              cacheControl: "public,max-age=300",
              contentType: "image/png",
              customMetadata: {
                originalName,
                uploadedAt: String(Date.now()),
              },
            })
          );
        }
        setProgressPhase("uploading");
        await Promise.all(promises);
        setFfmpegState(false);
        setLoading(false);
        setProgressPhase("");
        onUploadFinished();
      } catch (err) {
        console.error(err);
      }
      return;
    }
    alert(IMAGE_TYPES_ALLOWED);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <Stack width="100%">
        <VStack width="100%">
          <Flex
            height={50}
            p={4}
            justify="center"
            align="center"
            textAlign="center"
            cursor={ffmpegState ? "not-allowed" : "pointer"}
            bg="gray.100"
            w="100%"
            borderRadius={5}
            overflow="hidden"
            position="relative"
            opacity={ffmpegState ? 0.2 : 1}
            transition="opacity 0.1s"
            {...getRootProps()}
            flexDirection="column"
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
                cursor: ffmpegState ? "not-allowed" : "pointer",
              }}
              disabled={ffmpegState}
            />
            {loading ? (
              <Flex p={4} flexDirection="column">
                <Flex justifyContent="center" flex="1" my={4}>
                  {progressPhase === "resizing" && (
                    <Text>{$t("RESIZING_IMAGE")}</Text>
                  )}
                  {progressPhase === "uploading" && (
                    <Text>{$t("UPLOADING_IMAGE")}</Text>
                  )}
                </Flex>
              </Flex>
            ) : (
              <Text>{$t("DROP_ZONE_TEXT_SINGULAR")}</Text>
            )}
          </Flex>
        </VStack>
      </Stack>
    </>
  );
};

export default Dropzone;
