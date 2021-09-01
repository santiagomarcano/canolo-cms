import React from "react";
import Structure from "layouts/Dashboard";
import { $t } from "store/TranslationsContext";
import useCollection from "hooks/useCollection";
import Loader from "components/Loader";
import {
  Box,
  Button,
  Divider,
  Flex,
  UnorderedList,
  Text,
  GridItem,
  SimpleGrid,
  Grid,
  Icon,
} from "@chakra-ui/react";
import { Module, PageModule } from "interfaces/declarations";
import { collection } from "firebase/firestore";
import { db } from "utils/firebase";
import { RouteComponentProps, Link } from "@reach/router";
import { FiArrowRight, FiCheck, FiEye, FiEyeOff } from "react-icons/fi";
import { getDateTime } from "utils/helpers";

interface PageProps extends RouteComponentProps {
  id?: string;
}

const boxStyles = {
  borderWidth: "1px",
  borderRadius: "lg",
  overflow: "hidden",
  boxShadow: "sm",
  padding: 3,
  width: "100%",
};

export default function Pages({}: PageProps) {
  const [pages, loading] = useCollection(collection(db, "pages"));

  return (
    <Structure>
      <Loader state={!loading}>
        <>
          <Flex justifyContent="flex-end">
            <Link to="/dashboard/new-page">
              <Button colorScheme="blue">{$t("NEW_PAGE")}</Button>
            </Link>
          </Flex>
          <Divider my={5} />
          <UnorderedList m={0}>
            <Box background="gray.200" {...boxStyles}>
              <Grid templateColumns={["2fr 2fr 1fr 1fr"]} alignItems="center">
                <GridItem>
                  <Text color="gray.600">{$t("NAME")}</Text>
                </GridItem>
                <GridItem>
                  <Text color="gray.600">{$t("LAST_UPDATE")}</Text>
                </GridItem>
                <GridItem justifySelf="center">
                  <Text color="gray.600">{$t("STATE")}</Text>
                </GridItem>
                <GridItem justifySelf="end">
                  <Text></Text>
                </GridItem>
              </Grid>
            </Box>
            <Divider my={2} />
            {pages?.docs.map((page: Module) => (
              <React.Fragment key={page.id}>
                <Link key={page.id} to={`/dashboard/pages/${page.id}`}>
                  <Box
                    {...boxStyles}
                    background="white"
                    cursor="pointer"
                    transition="background 0.5s"
                    _hover={{
                      background: "gray.200",
                    }}
                  >
                    <Grid
                      templateColumns={["2fr 2fr 1fr 1fr"]}
                      alignItems="center"
                    >
                      <GridItem>
                        <Text>{page.id}</Text>
                      </GridItem>
                      <GridItem>
                        <Text>{getDateTime(page?.data().lastUpdate)}</Text>
                      </GridItem>
                      <GridItem justifySelf="center">
                        {Number(page?.data().state) ? (
                          <FiEye />
                        ) : (
                          <FiEyeOff />
                        )}
                      </GridItem>
                      <GridItem justifySelf="end">
                        <FiArrowRight />
                      </GridItem>
                    </Grid>
                  </Box>
                </Link>
                <Divider my={2} />
              </React.Fragment>
            ))}
          </UnorderedList>
        </>
      </Loader>
    </Structure>
  );
}
