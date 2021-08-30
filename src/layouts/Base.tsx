import React, { ReactElement, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { TranslationsProvider } from "../store/TranslationsContext";
import { initializeFFMPEG } from "utils/ffmpeg";
import { FFMPEGProvider } from "store/FFMPEGProvider";

export default function Layout({ children }: { children: ReactElement }) {
  useEffect(() => {
    initializeFFMPEG();
  }, []);
  return (
    <TranslationsProvider>
      <FFMPEGProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </FFMPEGProvider>
    </TranslationsProvider>
  );
}
