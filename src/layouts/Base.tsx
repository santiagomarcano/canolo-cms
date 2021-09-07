import React, { ReactElement, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { TranslationsProvider } from "../store/TranslationsContext";
import { initializeFFMPEG } from "utils/ffmpeg";
import { FFMPEGProvider } from "store/FFMPEGProvider";
import { PublishProvider } from "store/PublishContext";

export default function Layout({ children }: { children: ReactElement }) {
  useEffect(() => {
    initializeFFMPEG();
  }, []);
  return (
    <TranslationsProvider>
      <PublishProvider>
        <FFMPEGProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </FFMPEGProvider>
      </PublishProvider>
    </TranslationsProvider>
  );
}
