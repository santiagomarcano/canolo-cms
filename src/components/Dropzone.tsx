import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Flex,
  Text,
  Stack,
  CircularProgress,
  VStack,
  Progress,
  CircularProgressLabel,
  Container,
  Button,
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
  const STARTING_UPLOAD = $t("STARTING_UPLOAD");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [progressPhase, setProgressPhase] = useState("");
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (allowedTypes.includes(file.type)) {
      setFfmpegState(true);
      setLoading(true);
      try {
        const progress = {
          set: setProgress,
          value: 0,
        };
        setProgressPhase("resizing");
        const { images, name: originalName } = await resizeBatch({
          file,
          progress,
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
          setProgress(
            parseInt(((progress.value * 100) / (sizes.length * 2)) as any)
          );
        }
        setProgressPhase("uploading");
        await Promise.all(promises);
        setFfmpegState(false);
        setLoading(false);
        setProgressPhase("");
        setProgress(0);
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
          <Button
            size="lg"
            // justify="center"
            // align="center"
            // textAlign="center"
            // cursor={ffmpegState ? "not-allowed" : "pointer"}
            // bg="gray.100"
            // w="100%"
            // borderRadius={5}
            // overflow="hidden"
            // position="relative"
            // opacity={ffmpegState ? 0.2 : 1}
            // {...getRootProps()}
            // flexDirection="column"
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
                    <Text>Resizing image...</Text>
                  )}
                  {progressPhase === "uploading" && (
                    <Text>Uploading image...</Text>
                  )}
                </Flex>
                <Flex justifyContent="center" flex="1" my={4}>
                  <CircularProgress
                    value={typeof progress === "string" ? 1 : progress}
                    flexDirection="row"
                  >
                    <CircularProgressLabel>{progress}%</CircularProgressLabel>
                  </CircularProgress>
                </Flex>
              </Flex>
            ) : (
              <Text>{$t("DROP_ZONE_TEXT_SINGULAR")}</Text>
            )}
          </Button>
        </VStack>
      </Stack>
    </>
  );
};

export default Dropzone;
