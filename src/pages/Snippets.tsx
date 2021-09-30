import React from "react";
import Structure from "layouts/Dashboard";
import { $t } from "store/TranslationsContext";
import useCollection from "hooks/useCollection";
import { db } from "utils/firebase";
import { collection } from "firebase/firestore";
import Loader from "components/Loader";
import { Box, Button, Divider, Flex, UnorderedList } from "@chakra-ui/react";
import { Module } from "interfaces/declarations";
import { Link, RouteComponentProps } from "@reach/router";
import { FiArrowRight } from "react-icons/fi";

interface Props extends RouteComponentProps {
  location?: any;
}

export default function Snippets({ location }: Props) {
  const [snippets, loading] = useCollection(collection(db, "snippets"));
  return (
    <Structure name={location.state.name}>
      <Loader state={!loading}>
        <Flex justifyContent="flex-end">
          <Link to="/dashboard/new-snippet">
            <Button colorScheme="blue">{$t("NEW_SNIPPET")}</Button>
          </Link>
        </Flex>
        <Divider my={5} />
        <UnorderedList m={0}>
          {snippets?.docs.map((snippet: Module) => (
            <React.Fragment key={snippet.id}>
              <Link key={snippet.id} to={`/dashboard/snippets/${snippet.id}`}>
                <Box
                  boxShadow="sm"
                  width="100%"
                  background="white"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  padding="3"
                  cursor="pointer"
                  transition="background 0.5s"
                  _hover={{
                    background: "gray.200",
                  }}
                >
                  <Flex justifyContent="space-between" alignItems="center">
                    <div>
                      {snippet?.data()?.name}
                    </div>
                    <FiArrowRight />
                  </Flex>
                </Box>
              </Link>
              <Divider my={2} />
            </React.Fragment>
          ))}
        </UnorderedList>
      </Loader>
    </Structure>
  );
}
