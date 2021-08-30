import React, {
  ReactElement,
  UIEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button as ChakraButton,
  CircularProgress,
  Image,
  Grid,
  GridItem,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import { storage } from "utils/firebase";
import useStorage from "hooks/useStorage";
import { ref } from "firebase/storage";
import Loader from "./Loader";
import Dropzone from "components/Dropzone";
import { $t } from "store/TranslationsContext";
import { useMemo } from "react";
import { sizes } from "utils/ffmpeg";
import { FiSearch } from "react-icons/fi";

interface Props {
  selected: Array<string> | string;
  multiple: boolean;
  onSelect: Function;
  onClose: any;
}

const MediaGallery = ({
  selected,
  multiple = false,
  onSelect,
  onClose
}: Props): ReactElement => {
  const [page, setPage] = useState(0);
  const [trigger, setTrigger] = useState(Math.random());
  const gridRef = useRef<HTMLDivElement>(null);
  const [files, listLength, loading] = useStorage(
    {
      as: "paginated-list",
      ref: ref(storage, "images"),
      page,
      amount: 50,
    },
    [page, trigger]
  );
  const [filter, setFilter] = useState("");
  const handleFilter = ({ target }: { target: HTMLInputElement }) => {
    setFilter(target.value.toLowerCase());
  };
  return (
    <>
      <Flex flex="1" py={2}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FiSearch />} />
          <Input
            type="text"
            placeholder={$t("SEARCH_BY_NAME")}
            onChange={handleFilter}
          />
        </InputGroup>
      </Flex>
      <Grid
        templateColumns={["repeat(3, 1fr)"]}
        gap={5}
        maxHeight={500}
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
            //   background: "red",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "24px",
            background: "lightgray",
          },
        }}
      >
        {useMemo(() => {
          return (
            <>
              {files.map(({ url, meta, ref }, index) => {
                const urlPlaceholder = url.replace("300", "{size}");
                if (
                  meta.customMetadata.originalName
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                ) {
                  return (
                    <GridItem
                      key={index}
                      ref={gridRef}
                      overflow="hidden"
                      borderRadius="5"
                      padding={2}
                      borderColor={
                        selected === urlPlaceholder ? "blue.200" : "gray.200"
                      }
                      cursor="pointer"
                      onClick={() => onSelect(urlPlaceholder)}
                      borderWidth={3}
                      transition="border 0.5s"
                    >
                      <Image
                        src={url}
                        crossOrigin="anonymous"
                        objectFit="cover"
                        boxSize="100%"
                        height="200px"
                        background="gray.200"
                        borderColor="gray.200"
                        borderWidth="0"
                      />
                      <Text fontSize="xs" mt={2}>
                        {meta.customMetadata.originalName}
                      </Text>
                    </GridItem>
                  );
                }
              })}
            </>
          );
        }, [files, filter, selected])}
      </Grid>
      {loading ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          opacity="0.4"
          my={5}
          width="100%"
          h={50}
          background="gray.200"
        >
          <CircularProgress isIndeterminate size={10} />
        </Flex>
      ) : (
        <Flex justifyContent="space-between" my={6}>
          <GridItem>
            <Dropzone
              onUploadFinished={() => {
                gridRef.current?.scrollIntoView(false);
                setTrigger(Math.random());
              }}
            />
          </GridItem>
          <GridItem>
            <Button size="lg" onClick={onClose}>OK</Button>
          </GridItem>
        </Flex>
      )}
    </>
  );
};

export default MediaGallery;
