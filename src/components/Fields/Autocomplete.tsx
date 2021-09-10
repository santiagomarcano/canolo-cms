import React, { useRef, useState } from "react";
import {
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Divider,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Box,
  SlideFade,
  Flex,
} from "@chakra-ui/react";
import { usePage } from "store/PageContext";
import { $t } from "store/TranslationsContext";
import FieldHeader from "./FieldHeader";
import { FiSearch, FiX } from "react-icons/fi";

interface Props {
  name: string;
  onChange: Function;
  values: Array<string>;
  alias: string;
  selected: Array<string>;
}

const boxStyles = {
  borderColor: "gray.200",
  borderRadius: 5,
  borderWidth: 1,
  p: 2,
  my: 1,
  cursor: "pointer",
  maxHeight: 200,
  _hover: {
    background: "gray.200",
    color: "white",
  },
};

const Autocomplete = ({ onChange, values, name, alias, selected }: Props) => {
  const NO_RESULTS = $t("NO_RESULTS");
  const itemsRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const [filter, setFilter] = useState<string>("");
  const handleAddTag = (e: any) => {
    onChange([...selected, e.target.textContent]);
    setFilter("");
    itemsRef.current.scrollTop =
      itemsRef.current.scrollHeight - itemsRef.current.clientHeight;
  };
  const handleRemoveTag = (tag: string) => {
    onChange([...selected.filter((item) => item !== tag)]);
    setFilter("");
  };
  const handleFilter = ({ target }: { target: HTMLInputElement }) => {
    setFilter(target.value);
  };
  return (
    <Stack width="100%">
      <Divider my={2} />
      <Flex flexWrap="wrap" maxHeight={150} overflow="scroll" ref={itemsRef}>
        {selected &&
          selected.map((tag: string) => (
            <Button
              key={tag}
              onClick={() => handleRemoveTag(tag)}
              rightIcon={<FiX pointerEvents="none" />}
              mr={2}
              mb={2}
            >
              <div></div>
              {tag}
            </Button>
          ))}
      </Flex>
      <HStack width="100%">
        <FormControl>
          <FormLabel>{$t("ADD_YOUR_TAGS")}</FormLabel>
          <InputGroup>
            <Input
              onChange={handleFilter}
              pattern="^[ A-Za-z0-9_@./#&+-]*$"
              autoComplete="off"
              value={filter}
              type="text"
              onKeyPress={(e: any) => {
                if (e.code === "Enter" || e.which === 13) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
              }}
            />
            <InputRightElement children={<FiSearch />} />
          </InputGroup>
        </FormControl>
      </HStack>
      <SlideFade in={Boolean(values)} offsetY="10px">
        <List
          borderColor="gray.200"
          borderRadius={5}
          borderWidth={1}
          p={2}
          maxHeight={150}
          height={150}
          overflow="scroll"
        >
          {((values &&
            values.filter((item) => item?.includes(filter))?.length === 0) ||
            selected?.length === values?.length) && (
            <ListItem>
              <Box
                {...boxStyles}
                color="gray.500"
                _hover={{ background: "white", color: "gray.500" }}
                cursor="not-allowed"
              >
                {NO_RESULTS}
              </Box>
            </ListItem>
          )}
          {values &&
            values
              .filter(
                (item) => item?.includes(filter) && !selected.includes(item)
              )
              .map((tag: string) => (
                <ListItem key={tag} onClick={handleAddTag}>
                  <Box {...boxStyles}>{tag}</Box>
                </ListItem>
              ))}
        </List>
      </SlideFade>
    </Stack>
  );
};

export default Autocomplete;
