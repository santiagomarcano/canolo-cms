import React, {
  ReactElement,
  useRef,
  useState,
} from "react";
import {
  CircularProgress,
  Image,
  Grid,
  GridItem,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { storage } from "utils/firebase";
import useStorage from "hooks/useStorage";
import { deleteObject, ref } from "firebase/storage";
import Dropzone from "components/Dropzone";
import { $t } from "store/TranslationsContext";
import { useMemo } from "react";
import { FiSearch, FiTrash } from "react-icons/fi";

interface Props {
  selected?: Array<string> | string;
  onSelect?: Function;
  onClose?: any;
  isModal?: boolean;
}

const MediaGallery = ({
  selected,
  onSelect = () => {},
  onClose = () => {},
  isModal = true,
}: Props): ReactElement => {
  const [page, setPage] = useState(0);
  const [trigger, setTrigger] = useState(Math.random());
  const gridRef = useRef<HTMLDivElement>(null);
  const SURE_DELETE = $t("SURE_DELETE");
  const DELETE = $t("DELETE");
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
  const handleDelete = async (ref: any) => {
    const confirmation = window.confirm(SURE_DELETE);
    if (confirmation) {
      await deleteObject(ref);
      setTrigger(Math.random());
    }
  };
  return (
    <>
      <Grid flex="1" py={2}>
        <GridItem>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FiSearch />} />
            <Input
              type="text"
              placeholder={$t("SEARCH_BY_NAME")}
              onChange={handleFilter}
              pattern="^[ A-Za-z0-9_@./#&+-]*$"
            />
          </InputGroup>
        </GridItem>
        <GridItem>
          {loading ? (
            <Flex
              justifyContent="center"
              alignItems="center"
              opacity="0.4"
              my={5}
              width="100%"
              h={50}
              background={isModal ? "gray.200" : "white"}
            >
              <CircularProgress isIndeterminate size={10} />
            </Flex>
          ) : (
            <Flex justifyContent="space-between" my={6}>
              <Dropzone
                onUploadFinished={() => {
                  setTrigger(Math.random());
                }}
              />
            </Flex>
          )}
        </GridItem>
      </Grid>
      <Grid
        templateColumns={["repeat(3, 1fr)"]}
        gap={5}
        maxHeight={isModal ? 500 : "auto"}
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
                      onClick={() => {
                        onSelect(urlPlaceholder);
                        onClose();
                      }}
                      borderWidth={3}
                      transition="border 0.5s"
                      position="relative"
                    >
                      <IconButton
                        aria-label={DELETE}
                        icon={<FiTrash />}
                        position="absolute"
                        top={1}
                        right={1}
                        isRound
                        size="sm"
                        colorScheme="red"
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleDelete(ref);
                        }}
                      />
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
    </>
  );
};

export default MediaGallery;
