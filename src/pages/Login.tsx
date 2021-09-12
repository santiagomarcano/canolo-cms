import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { $t } from "store/TranslationsContext";
import { auth } from "utils/firebase";
import Button from "components/Button";

interface Props extends RouteComponentProps {}

export default function SimpleCard({ navigate }: Props) {
  const INVALID_EMAIL = $t("INVALID_EMAIL");
  const USER_NOT_FOUND = $t("USER_NOT_FOUND");
  const WRONG_PASSWORD = $t("WRONG_PASSWORD");
  const [loading, setLoading] = useState(false);
  const [user] = useAuth({ auth, deps: [] });
  useEffect(() => {
    if (user && navigate) {
      navigate("/dashboard/pages");
    }
  }, [user]);
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    const { elements } = e.target;
    const email = elements.namedItem("email").value;
    const password = elements.namedItem("password").value;
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (credential.user && navigate) {
        navigate("/dashboard/pages");
      }
    } catch (err: any) {
      switch (err.code) {
        case "auth/invalid-email":
          alert(INVALID_EMAIL);
          break;
        case "auth/user-not-found":
          alert(USER_NOT_FOUND);
          break;
        case "auth/wrong-password":
          alert(WRONG_PASSWORD);
          break;
      }
    } finally {
      setLoading(false)
    }
  };
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="3xl" width="3xl" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">{$t("ADMIN_AREA")}</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="email" mb={4}>
                <FormLabel>{$t("EMAIL")}</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>{$t("PASSWORD")}</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10} mt={4}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  loading={loading}
                  label={$t("LOGIN")}
                />
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
