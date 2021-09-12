import React from "react";
import Structure from "layouts/Dashboard";
import { RouteComponentProps } from "@reach/router";
import MediaGallery from "components/MediaGallery";
import { Box, Heading } from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";

interface PageProps extends RouteComponentProps {}

const Gallery = ({}: PageProps) => {
  return (
    <Structure name={$t("GALLERY")}>
      <Box background="white" p={4} borderRadius={5}>
        <Heading as="h4" size="md" mb={2}>
          {$t("MEDIA_GALLERY")}
        </Heading>
        <MediaGallery isModal={false} />
      </Box>
    </Structure>
  );
};

export default Gallery;
