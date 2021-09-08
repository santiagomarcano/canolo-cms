import React from "react";
import {
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Divider,
  Input,
  Button,
} from "@chakra-ui/react";
import { usePage } from "store/PageContext";
import { $t } from "store/TranslationsContext";
import FieldHeader from "./FieldHeader";

interface Props {
  name: string;
  onChange: Function;
  value: Array<string>;
  alias: string;
}

const Tags = ({ onChange, value, name = 'tags', alias = 'Tags' }: Props) => {
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
      onChange(next)
      e.target.value = "";
    }
  };
  const handleRemoveTag = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const targetValue = e.target.textContent;
    const current = value;
    let next: Array<string> = [];
    if (current) {
      next = current.filter((item: string) => item !== targetValue);
    }
    onChange(next)
  };
  return (
    <Stack width="100%">
      <FieldHeader name={name} alias={alias} />
      <Divider />
      <HStack>
        {value && value.map((tag: string) => (
          <Button key={tag} onClick={handleRemoveTag}>
            {tag}
          </Button>
        ))}
      </HStack>
      <HStack width="100%">
        <FormControl>
          <FormLabel>{$t("ADD_YOUR_TAGS")}</FormLabel>
          <Input
            onKeyPress={handleAddTag}
            pattern="^[ A-Za-z0-9_@./#&+-]*$"
          />
        </FormControl>
      </HStack>
    </Stack>
  );
};

export default Tags;
