import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { RouteComponentProps } from '@reach/router';
import { $t } from 'store/TranslationsContext';

interface Props extends RouteComponentProps {}

export default function SimpleCard({}: Props) {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="3xl" minW="3xl" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">{$t("ADMIN_AREA")}</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>{$t("EMAIL")}</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>{$t("PASSWORD")}</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              {/* <Stack
                direction={{ base: 'column', sm: 'row' }}
                align="start"
                justify="space-between">
                <Checkbox>Remember me</Checkbox>
                <Link color="blue.400">Forgot password?</Link>
              </Stack> */}
              <Button
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}>
                {$t("LOGIN")}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}