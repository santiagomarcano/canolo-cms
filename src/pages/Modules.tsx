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

interface Props extends RouteComponentProps {}

export default function Modules({}: Props) {
  const [modules, loading] = useCollection(collection(db, "modules"));

  return (
    <Structure>
      <Loader state={!loading}>
        <Flex justifyContent="flex-end">
          <Link to="/dashboard/new-module">
            <Button colorScheme="blue">{$t("NEW_MODULE")}</Button>
          </Link>
        </Flex>
        <Divider my={5} />
        <UnorderedList m={0}>
          {modules?.docs.map((module: Module) => (
            <React.Fragment key={module.id}>
              <Link key={module.id} to={`/dashboard/modules/${module.id}`}>
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
                      {module?.data()?.meta?.name}
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
