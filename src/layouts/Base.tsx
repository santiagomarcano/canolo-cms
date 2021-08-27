import React, { ReactElement, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { TranslationsProvider } from "../store/TranslationsContext";
import { initializeFFMPEG } from "utils/ffmpeg";

export default function Layout({ children }: { children: ReactElement }) {
  useEffect(() => {
    initializeFFMPEG();
  }, []);
  return (
    <TranslationsProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </TranslationsProvider>
  );
}
