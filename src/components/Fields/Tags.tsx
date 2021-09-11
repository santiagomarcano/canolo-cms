import React from "react";
import {
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Divider,
  Input,
  Button,
  Flex,
  Container,
} from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import FieldHeader from "./FieldHeader";
import { FiX } from "react-icons/fi";

interface Props {
  name: string;
  onChange: Function;
  value: Array<string>;
  alias: string;
  label?: string;
  header?: boolean;
}

const Tags = ({ onChange, value, name = "tags", alias = "Tags", label = "Tags", header = true }: Props) => {
  const handleAddTag = (e: any) => {
    e.stopPropagation();
    if (e.code === "Enter" || e.which === 13) {
      e.preventDefault();
      const { value: targetValue } = e.target;
      const current = value;
      if (current && current.includes(targetValue)) return;
      let next: Array<string> = [];
      if (current) {
        next = [...current, targetValue];
      } else {
        next = [targetValue];
      }
      onChange(next);
      e.target.value = "";
    }
  };
  const handleRemoveTag = (tag: string) => {
    const current = value;
    let next: Array<string> = [];
    if (current) {
      next = current.filter((item: string) => item !== tag);
    }
    onChange(next);
  };
  return (
    <Container width="100%" p={0} m={0} maxWidth="none">
      {header && <FieldHeader name={name} alias={alias} />}
      <Divider />
      <Flex flexWrap="wrap" mt={2} maxHeight={300} overflow="scroll">
        {value &&
          value.map((tag: string) => (
            <Button key={tag} onClick={() => handleRemoveTag(tag)} rightIcon={<FiX />} mr={2} mb={2} >
              {tag}
            </Button>
          ))}
      </Flex>
      <HStack width="100%">
        <FormControl>
          <FormLabel>{label}</FormLabel>
          <Input onKeyPress={handleAddTag} pattern="^[ A-Za-z0-9_@./#&+-]*$" width="100%" />
        </FormControl>
      </HStack>
    </Container>
  );
};

export default Tags;
