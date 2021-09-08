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
  Grid,
} from "@chakra-ui/react";
import { Module } from "interfaces/declarations";
import { collection as firebaseCollection } from "firebase/firestore";
import { db } from "utils/firebase";
import { RouteComponentProps, Link } from "@reach/router";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { getDateTime } from "utils/helpers";
import { usePublish } from "store/PublishContext";

interface Props extends RouteComponentProps {
  id?: string;
  path: string;
  collection?: string;
  location?: any;
}

const boxStyles = {
  borderWidth: "1px",
  borderRadius: "lg",
  overflow: "hidden",
  boxShadow: "sm",
  padding: 3,
  width: "100%",
};

const getPublishColor = (date: string, lastUpdate: string): string => {
  if (new Date(date).getTime() < new Date(lastUpdate).getTime()) {
    return "blue";
  }
  return "transparent";
};

export default function CollectionInstanceList({ collection, location }: Props) {
  const [pages, loading] = useCollection(firebaseCollection(db, `${collection}`), null, [collection]);
  const publish = usePublish();
  return (
    <Structure name={location.state.name}>
      <Loader state={!loading}>
        <>
          <Flex justifyContent="flex-end">
            <Link to={`/dashboard/${collection}/new`}>
              <Button colorScheme="blue">{$t("CREATE_NEW")}</Button>
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
                <Link key={page.id} to={`/dashboard/${collection}/${page.id}`}>
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
                        <Text>{page?.data().name}</Text>
                      </GridItem>
                      <GridItem>
                        <Text
                          borderColor={getPublishColor(publish.date, page?.data().lastUpdate)}
                          borderWidth={2}
                          borderRadius={5}
                          p={2}
                        >
                          {getDateTime(page?.data().lastUpdate)}
                        </Text>
                      </GridItem>
                      <GridItem justifySelf="center">
                        {Number(page?.data().state) ? <FiEye /> : <FiEyeOff />}
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
