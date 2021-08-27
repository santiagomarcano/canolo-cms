import React from "react";
import Structure from "layouts/Dashboard";
import { $t } from "store/TranslationsContext";
import useCollection from "hooks/useCollection";
import { db } from "utils/firebase";
import { collection } from "firebase/firestore";
import Loader from "components/Loader";
import ModuleForm from "components/ModuleForm";
import Overlay from "components/Overlay";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Module } from "interfaces/declarations";
import { RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {}

export default function Modules({}: Props) {
  const [modules] = useCollection(collection(db, "modules"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Structure>
      <Loader state={modules}>
        <>
          <Flex justifyContent="flex-end">
            <Button colorScheme="blue" onClick={onOpen}>
              {$t("NEW_MODULE")}
            </Button>
          </Flex>
          <Overlay
            headerLabel={$t("NEW_MODULE")}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModuleForm onClose={onClose} />
          </Overlay>
          <>
            {modules?.docs.map((module: Module) => (
              <div key={module.id}>{module.id}</div>
            ))}
          </>
        </>
      </Loader>
    </Structure>
  );
}
