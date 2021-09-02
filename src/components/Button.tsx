import React, { ReactElement, MouseEventHandler } from "react";
import {
  Button as ChakraButton,
  CircularProgress,
} from "@chakra-ui/react";

interface Props {
  loading?: boolean;
  label: string;
  size?: string;
  type?: "submit" | "button";
  onClick?: MouseEventHandler;
  disabled?: boolean;
  mr?: string | number;
  colorScheme?: string;
}

const Button = ({
  loading = false,
  label = "VOID",
  size = "lg",
  type = "submit",
  onClick = () => {},
  ...rest
}: Props): ReactElement => {
  return (
    <ChakraButton type={type} size={size} onClick={onClick} {...rest} minWidth="100px">
      {loading ? (
        <CircularProgress isIndeterminate size="20px" thickness="10px" />
      ) : (
        <>{label}</>
      )}
    </ChakraButton>
  );
};

export default Button;
