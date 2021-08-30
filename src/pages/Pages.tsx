import React from "react";
import Structure from "layouts/Dashboard";
import { $t } from "store/TranslationsContext";
import useCollection from "hooks/useCollection";
import Loader from "components/Loader";
import { Box, Button, Divider, Flex, UnorderedList } from "@chakra-ui/react";
import { Module, PageModule } from "interfaces/declarations";
import { collection } from "firebase/firestore";
import { db } from "utils/firebase";
import { RouteComponentProps, Link } from "@reach/router";
import { FiArrowRight } from "react-icons/fi";

interface PageProps extends RouteComponentProps {
  id?: string;
}

export default function Pages({}: PageProps) {
  const [pages] = useCollection(collection(db, "pages"));

  return (
    <Structure>
      <Loader state={pages}>
        <>
          <Flex justifyContent="flex-end">
            <Link to="/dashboard/new-page">
              <Button colorScheme="blue">{$t("NEW_PAGE")}</Button>
            </Link>
          </Flex>
          <Divider my={5} />
          <UnorderedList m={0}>
            {pages?.docs.map((page: Module) => (
              <React.Fragment key={page.id}>
                <Link key={page.id} to={`/dashboard/pages/${page.id}`}>
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
                      <div>{page.id}</div>
                      <FiArrowRight />
                    </Flex>
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
