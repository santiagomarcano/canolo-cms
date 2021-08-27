import React from "react";
import Structure from "layouts/Dashboard";
import { $t } from "store/TranslationsContext";
import useCollection from "hooks/useCollection";
import Loader from "components/Loader";
import Overlay from "components/Overlay";
import PageForm from "components/PageForm";
import {
  Box,
  Button,
  Divider,
  Flex,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { Module, PageModule } from "interfaces/declarations";
import { PageProvider } from "store/PageContext";
import { collection } from "firebase/firestore";
import { db } from "utils/firebase";
import { RouteComponentProps, Link } from "@reach/router";
import { FiArrowRight } from "react-icons/fi";

interface PageProps extends RouteComponentProps {
  id?: string;
}

const Page = ({ id }: PageProps) => {
  // const data = useDocumentData(firebase.firestore().collection("pages").doc(id))
  // console.log(data)
  return <div>{id}</div>;
};

export default function Pages({}: PageProps) {
  const [pages] = useCollection(collection(db, "pages"));
  const [modules] = useCollection(collection(db, "modules"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Structure>
      <Loader state={pages}>
        <>
          <Flex justifyContent="flex-end">
            <Button colorScheme="blue" onClick={onOpen}>
              {$t("NEW_PAGE")}
            </Button>
          </Flex>
          <Overlay
            isOpen={isOpen}
            onClose={onClose}
            headerLabel={$t("NEW_PAGE")}
          >
            <PageProvider value={{ name: "", modules: [] }}>
              <PageForm
                onClose={onClose}
                modules={modules?.docs as Array<any>}
              />
            </PageProvider>
          </Overlay>
          <Divider my="5" />
          <UnorderedList>
            {pages?.docs.map((page: Module) => (
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
            ))}
          </UnorderedList>
        </>
      </Loader>
    </Structure>
  );
}
